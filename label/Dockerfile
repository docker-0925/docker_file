#RUN instruction

FROM alpine:3

LABEL author="M. Hasan"
LABEL company="GLI" website="https://www.gli.id"

RUN mkdir hello
RUN echo "Hello World" > "hello/world.txt"

CMD cat "hello/world.txt"