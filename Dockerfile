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


# Stage 1: Build the React Frontend
# Uses a Node.js image to install dependencies and build your React application.
FROM node:20-alpine AS react-builder

# Set the working directory inside the container for the frontend build.
WORKDIR /app/frontend

# Copy package.json and package-lock.json first to leverage Docker layer caching.
# This ensures npm install is only re-run if dependencies change.
COPY package.json package-lock.json ./

# Install frontend dependencies. --omit=dev prevents installing devDependencies.
# --legacy-peer-deps can help avoid peer dependency warnings/errors.
RUN npm install --omit=dev --legacy-peer-deps

# Copy the rest of your React application files.
# This includes src/, public/, vite.config.js, etc.
COPY . .

# Run the build command for your Vite React app.
# This will create the optimized static files in the 'dist' directory.
RUN npm run build

# Stage 2: Serve the Static React App with Nginx
# Uses a lightweight Nginx image to serve the static content.
FROM nginx:alpine

# Copy the Nginx configuration file into the container.
# This custom config is crucial for telling Nginx how to serve your SPA,
# including handling client-side routing (e.g., React Router).
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React application from the 'react-builder' stage
# into the Nginx default web server root directory.
COPY --from=react-builder /app/frontend/dist /usr/share/nginx/html

# Expose port 8080. Cloud Run expects your container to listen on the port
# specified by the PORT environment variable, which it maps to 8080 by default.
EXPOSE 8080

# The default command for the nginx:alpine image already starts Nginx,
# so we don't need a custom CMD here.