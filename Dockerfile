
# Stage 1: Build the React Frontend
# Uses a Node.js image to install dependencies and build your React application.
FROM node:20-alpine AS react-builder

# Set the working directory inside the container for the frontend build.
WORKDIR /app/frontend

# Copy package.json and package-lock.json first to leverage Docker layer caching.
COPY package.json package-lock.json ./

# --- CHANGE THIS LINE ---
# Install ALL dependencies, including devDependencies, because 'vite' is needed for the build.
RUN npm install

# Copy the rest of your React application files.
COPY . .

# Run the build command for your Vite React app.
RUN npm run build

# Stage 2: Serve the Static React App with Nginx
# Uses a lightweight Nginx image to serve the static content.
FROM nginx:alpine

# Copy the Nginx configuration file into the container.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React application from the 'react-builder' stage
# into the Nginx default web server root directory.
COPY --from=react-builder /app/frontend/dist /usr/share/nginx/html

# Expose port 8080.
EXPOSE 8080



