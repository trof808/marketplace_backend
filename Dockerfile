# Dockerfile

# Use the official Node.js image as a base
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g typescript ts-node
RUN npm run build

# Expose the port your app runs on
EXPOSE 8888

# Command to run the application
# CMD ["sh", "-c", "npm run start:dev & ts-node src/products/seed.ts"]
CMD ["sh", "-c", "npm run start:dev"]