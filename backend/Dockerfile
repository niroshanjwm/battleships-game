FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port your NestJS app uses
EXPOSE 8000

# Run migrations on container start
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
