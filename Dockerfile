
# Stage 1: Build the React Frontend
# Uses a Node.js image to install dependencies and build your React application.
FROM node:20-alpine AS react-builder


# --- ADD THESE TWO LINES ---
# 1. Declare a build argument to receive the variable from Cloud Build.
ARG VITE_REACT_APP_API_URL
# 2. Set it as an environment variable inside the container for Vite to pick up.
# ENV VITE_REACT_APP_API_URL=${VITE_REACT_APP_API_URL}
# --- END ADDITIONS ---


# Set the working directory inside the container for the frontend build.
WORKDIR /app/frontend

# Copy package.json and package-lock.json first to leverage Docker layer caching.
COPY package.json package-lock.json ./

# --- CHANGE THIS LINE ---
# Install ALL dependencies, including devDependencies, because 'vite' is needed for the build.
RUN npm install

# Copy the rest of your React application files.
COPY . .


# --- ADD THIS NEW LINE FOR DIAGNOSIS ---
RUN echo "DEBUG: VITE_REACT_APP_API_URL as seen in Docker build: '${VITE_REACT_APP_API_URL}'"
# --- END NEW LINE ---

# Run the build command for your Vite React app.
# RUN npm run build
RUN VITE_REACT_APP_API_URL=${VITE_REACT_APP_API_URL} npm run build

# # Stage 2: Serve the Static React App with Nginx
# # Uses a lightweight Nginx image to serve the static content.
FROM nginx:alpine

# # Copy the Nginx configuration file into the container.
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Install envsubst for substituting environment variables into Nginx config
RUN apk add --no-cache gettext

# Copy your Nginx configuration template
# Note: Renamed to .conf.template to signify it needs processing
COPY nginx.conf /etc/nginx/conf.d/default.conf.template



# Copy the built React application from the 'react-builder' stage
# into the Nginx default web server root directory.
COPY --from=react-builder /app/frontend/dist /usr/share/nginx/html

# Define an environment variable that Nginx will use for the backend URL.
# This value will be passed by gcloud run deploy --set-env-vars.
ENV API_PROXY_PASS_URL=http://localhost:8080 

# Use envsubst to substitute the environment variable into the Nginx config
# and then run Nginx.
CMD ["/bin/sh", "-c", "envsubst '$API_PROXY_PASS_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]



# Expose port 8080.
EXPOSE 8080



