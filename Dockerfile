# Use a Node.js base image with Alpine Linux
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install curl
RUN apk --no-cache add curl

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "server.js"]
