# Use Node.js as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 4000

# Start the server
CMD ["node", "server.js"]