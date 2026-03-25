# ☕ Cafe Flow Premium

Ứng dụng quản lý lịch trình cá nhân thông minh với giao diện **Vibrant Brown** sang trọng, hỗ trợ đa người dùng và lập kế hoạch tự động.

## ✨ Tính năng nổi bật

- **📅 Lịch trình Thông minh**: Quản lý sự kiện trực quan với FullCalendar.
- **🎨 Giao diện Premium**: Thiết kế tinh tế, hỗ trợ Dark/Light mode và micro-animations.
- **🔐 Bảo mật tối đa**: Xác thực JWT, mật khẩu băm Bcrypt, quản lý biến môi trường qua `.env`.
- **📊 Thống kê & Phân tích**: Theo dõi hiệu suất làm việc qua biểu đồ.
- **🚀 Lộ trình (Workflow)**: Vẽ sơ đồ công việc trực quan.
- **⏰ Giờ rảnh thông minh**: Tự động tìm kiếm khoảng trống trong lịch trình.

## 🛠️ Công nghệ sử dụng

- **Frontend**: React (Vite), Lucide Icons, FullCalendar, CSS Variables.
- **Backend**: Golang (Gin Framework), GORM.
- **Database**: Microsoft SQL Server (MSSQL).
- **Deployment**: Vercel (Frontend), Railway (Backend/Docker).

## 🚀 Hướng dẫn khởi chạy nhanh

### 1. Cấu hình
Sao chép `.env.example` thành `.env` và điền thông tin của bạn.

### 2. Chạy Backend
```bash
cd backend
go run cmd/api/main.go
```

### 3. Chạy Frontend
```bash
cd frontend
npm install
npm run dev
```

Chi tiết xem tại [DEPLOY.md](./DEPLOY.md).
