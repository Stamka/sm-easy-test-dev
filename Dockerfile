# Base image
FROM node:14.17.0-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Expose the port
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
