# Base image
FROM node:16-alpine

# Create app directory
WORKDIR /app

# Clean previous image
RUN rm -rf node_modules

COPY package.json ./

# Install app dependencies
RUN npm install --legacy-peer-deps

# Bundle app source
COPY . .

# Creates a "dist" folder with the dev build
CMD ["npm", "run", "start"]