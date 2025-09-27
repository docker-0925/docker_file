#ADD instruction

FROM alpine:3

RUN mkdir hello

COPY text/world.txt hello
COPY text/hasan.txt hello
#COPY text/*.txt hello

CMD cat "hello/world.txt"