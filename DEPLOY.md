# 🚀 Hướng Dẫn Deploy — Cafe Flow Premium

## Tổng quan kiến trúc Deploy

| Thành phần | Dịch vụ | Giá |
|---|---|---|
| Frontend (React) | **Vercel** | Miễn phí |
| Backend (Go/Gin) | **Railway** | Miễn phí (500h/tháng) |
| Database (MSSQL) | **Azure SQL Free** | Miễn phí |

---

## 1. 🌐 Frontend → Vercel

**Bước 1** — Build thử locally:
```bash
cd /Users/tb/wifi/frontend
npm run build
```

**Bước 2** — Deploy:
```bash
npm install -g vercel
vercel login
vercel --prod
```

Vercel hỏi:
- Framework: `Vite`
- Build command: `npm run build`
- Output dir: `dist`

**Bước 3** — Thêm biến môi trường trên Vercel Dashboard:

> Settings → Environment Variables

| Key | Value |
|---|---|
| `VITE_API_URL` | `https://your-backend.railway.app` |

---

## 2. ⚙️ Backend → Railway

**Bước 1** — Tạo `Dockerfile` trong `/Users/tb/wifi/backend/`:
```dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY . .
RUN go mod download && go build -o server cmd/api/main.go

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/server .
EXPOSE 8080
CMD ["./server"]
```

**Bước 2** — Deploy trên [railway.app](https://railway.app):
- New Project → Deploy from GitHub repo
- Settings → Source → Root Directory: `backend`

**Bước 3** — Thêm Variables trên Railway:

| Key | Value |
|---|---|
| `DB_HOST` | (địa chỉ Azure SQL hoặc Railway DB) |
| `DB_PORT` | `1433` |
| `DB_USER` | `sa` |
| `DB_PASSWORD` | mật khẩu của bạn |
| `DB_NAME` | `cute_calendar` |
| `JWT_SECRET` | một chuỗi bí mật ngẫu nhiên |

---

## 3. 🗄️ Database

### Phương án A — Azure SQL (dùng với MSSQL hiện tại)
1. [portal.azure.com](https://portal.azure.com) → Create Azure SQL Database (free tier 32GB)
2. Lấy connection string → điền vào Railway Variables

### Phương án B — Chuyển sang PostgreSQL (dễ nhất)
1. Railway → Add Service → **PostgreSQL** (miễn phí, tự cấp URL)
2. Cần đổi GORM driver từ `sqlserver` sang `postgres`

---

## 4. 🔗 Cập nhật CORS sau Deploy

Trong `backend/cmd/api/main.go`, thêm domain Vercel vào CORS:
```go
config.AllowOrigins = []string{
    "http://localhost:5175",
    "https://your-app.vercel.app",  // ← thêm dòng này
}
```

---

## 5. ✅ Checklist trước Deploy

- [ ] `npm run build` — không có lỗi
- [ ] `go build ./...` — không có lỗi
- [ ] `.gitignore` đã có `.env`
- [ ] CORS đã thêm domain Vercel
- [ ] Biến môi trường đã điền đủ trên Railway + Vercel

> [!TIP]
> Sau khi deploy xong, truy cập `https://your-app.vercel.app/register` để tạo tài khoản đầu tiên. CSDL sẽ tự động được khởi tạo khi Backend chạy lần đầu!
