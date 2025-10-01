#USER instruction

FROM golang:1.18-alpine

RUN mkdir /app

RUN addgroup -S onegroup
RUN adduser -S -D -h /app hasan onegroup
RUN chown -R hasan:onegroup /app

USER hasan

COPY main.go /app

EXPOSE 8080
CMD go run /app/main.go