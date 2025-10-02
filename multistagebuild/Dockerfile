#MULTISTACKBUILD

#Stage 1 - Kompil kode golang ke binary program
FROM golang:1.18-alpine as builder
WORKDIR /app/
COPY main.go /app/
RUN go build -o /app/main main.go

#Stage 2 - Eksekusi image dari binary yang sudah ada, ukuran image akan lebih kecil
FROM alpine:3
WORKDIR /app/
COPY --from=builder /app/main /app/
CMD /app/main