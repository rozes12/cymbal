# Use official Node.js runtime as the base image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend source code
COPY . .

# Expose port (Cloud Run uses PORT env variable, but good to expose 8080)
EXPOSE 8080

# Start the server
CMD ["node", "index.js"]
