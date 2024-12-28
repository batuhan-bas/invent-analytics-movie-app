# Base image olarak Node.js LTS sürümünü kullanıyoruz
FROM node:18-alpine

# Çalışma dizinini ayarlayın
WORKDIR /app

# Paket yöneticisini güncelleyin ve sadece gerekli dosyaları kopyalayın
COPY package.json pnpm-lock.yaml ./

# pnpm yükleyin
RUN npm install -g pnpm

# Bağımlılıkları yükleyin
RUN pnpm install --frozen-lockfile

# Uygulama kodunu kopyalayın
COPY . .

# Ortam değişkenlerini belirlemek için bir default port ayarlayın
ENV PORT=3000
EXPOSE 3000

# Uygulamayı başlat
CMD ["pnpm", "dev"]
