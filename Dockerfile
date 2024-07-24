# Use a lightweight Node.js image as the base
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if present) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your application listens on (replace with your actual port)
EXPOSE 7000

# Start the application
CMD [ "node", "index.js" ]
