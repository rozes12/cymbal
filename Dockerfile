# # Stage 1: Build the React application
# # Use a stable Node.js image for building the React app.
# FROM node:18-alpine AS builder

# # Set the working directory inside the container.
# WORKDIR /app

# # Copy package.json and yarn.lock first.
# # This allows Docker to cache these layers, speeding up builds if dependencies haven't changed.
# COPY package.json yarn.lock ./

# # Install project dependencies using Yarn.
# RUN yarn install --frozen-lockfile

# # Copy the rest of the application source code.
# COPY . .

# # Build the React application for production using Yarn.
# # This command generates the static files in the 'build' directory.
# RUN yarn build

# # Stage 2: Serve the React application with Nginx
# # Use a lightweight Nginx image to serve the static files.
# FROM nginx:alpine

# # Copy the Nginx configuration file.
# # This file is crucial for telling Nginx how to serve your React app,
# # especially for handling client-side routing (e.g., with React Router).
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Copy the built React app from the 'builder' stage into the Nginx public directory.
# # The 'build' directory from the previous stage contains all the static assets.
# COPY --from=builder /app/build /usr/share/nginx/html

# # Expose the port Nginx will listen on on. Cloud Run expects applications to listen on PORT 8080.
# # However, Nginx by default listens on port 80. The nginx.conf will map this.
# EXPOSE 8080

# # Command to run Nginx.
# # 'daemon off;' keeps Nginx running in the foreground, which is necessary for Docker containers.
# CMD ["nginx", "-g", "daemon off;"]


# # Stage 1: Build the React Frontend
# # Uses a Node.js image to install dependencies and build your React application.
# FROM node:20-alpine AS react-builder

# # Set the working directory inside the container for the frontend build.
# WORKDIR /app/frontend

# # Copy package.json and package-lock.json first to leverage Docker layer caching.
# COPY package.json package-lock.json ./

# # --- CHANGE THIS LINE ---
# # Install ALL dependencies, including devDependencies, because 'vite' is needed for the build.
# RUN npm install

# # Copy the rest of your React application files.
# COPY . .

# # Run the build command for your Vite React app.
# RUN npm run build

# # Stage 2: Serve the Static React App with Nginx
# # Uses a lightweight Nginx image to serve the static content.
# FROM nginx:alpine

# # Copy the Nginx configuration file into the container.
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Copy the built React application from the 'react-builder' stage
# # into the Nginx default web server root directory.
# COPY --from=react-builder /app/frontend/dist /usr/share/nginx/html

# # Expose port 8080.
# EXPOSE 8080



# -------- Stage 1: Build React Frontend --------
FROM node:20-alpine AS react-builder

WORKDIR /app

# Copy only frontend package files first for caching
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the files (including frontend and server)
COPY . .

# Build the React frontend
RUN npm run build

# -------- Stage 2: Build and Run Backend --------
FROM node:20-alpine

WORKDIR /app

# Install production dependencies for backend
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copy all source files (frontend build + backend)
COPY . .

# Copy frontend build to public folder (you can serve it via Express)
COPY --from=react-builder /app/dist ./dist

# Set environment variable to production
ENV NODE_ENV=production

# Expose port
EXPOSE 8080

# Run your Express backend
CMD ["node", "server/index.js"]
