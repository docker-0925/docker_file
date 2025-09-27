#ADD instruction

FROM alpine:3

RUN mkdir hello

ADD text/world.txt hello
ADD text/hasan.txt hello
#ADD text/*.txt hello

CMD cat "hello/world.txt"