FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

RUN npm run build

# Expose Next.js default port
EXPOSE 3000

# Start Next.js
CMD ["npm", "run", "start"]
