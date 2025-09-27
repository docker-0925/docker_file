//Docker File
//Sebuah file yang berisi instruksi/perintah yang disimpan untuk membuat docker image
//Dimana semua perintah yang ada di docker file akan dieksekusi untuk membua docker image
//Untuk membuat docker image dari docker file, bisa menggunakan perintah docker build
//Docker build akan membuat nama image secara otomatis dan random, namun bisa menambahkan nama/tag image nya dengan opsi -t
docker build -t <username-dockerhub>/<nama-image>:<tag-image> <folder-dockerfile> //buat image dengan docker file, jika tag kosong akan diset latest
docker build -t <username-dockerhub>/<nama-image>:<tag-image> -t <username-dockerhub>/<nama-image>:<tag-image> <folder-dockerfile> //buat beberapa image sekaligus

//Docker File Format
//Docker file biasanya dibuat dalam sebuah file dengan nama Dockerfile, tidak memiliki extension apapun
//Walau sebenarnya bisa membuat dengan nama lain, namun direkomendasikan menggunakan nama Dockerfile
//Dalam docker file terdapat instruction format yaitu :
#Komentar
INSTRUCTION arguments
//1. # -> untuk menambah komentar, tidak akan dieksekusi
//2. INSTRUCTION -> perintah yang digunakan Dockerfile, banyak perintah yang tersedia & penulisannya case insensitive
//sehingga sebenarnya bebas dengan hurus besar/kecil, namun direkomendasikan dengan UPPERCASE
//3. Arguments -> data argument/parameter untuk INSTRUCTION, yang menyesuaikan dengan jenis INSTRUCTION yang digunakan

//From Instruction
//Saat membuat docker image, perintah/stage pertama adalah build stage dengan instruksi FROM
//FROM digunakan untuk membuat build stage dari image yang sudah ditentukan
//Biasanya jarang ada pembuatan image dari kosongan (scratch), seringnya membuat docker image dari image lain yang sudah ada
FROM image:version //penggunaan instruksi FROM, letakkan di Dockerfile
FROM alpine:3 //contoh penggunaan
docker build -t mhdhasan18/alpine-test from //kemudian jalankan docker file dengan docker build untuk membuat docker image
docker image ls //cek apakah image nya berhasil dibuat di daftar docker image

//Run Instruction
//RUN -> instruksi untuk mengeksekusi perintah di dalam image pada saat build stage
//Hasil perintah RUN akan dicommit dalam perubahan image tersebut, jadi RUN akan dieksekusi saat proses docker build saja
//Ketika sudah menjadi docker image/menjalankan docker container dari image tersebut, perintah RUN tidak akan dijalankan lagi
//Contoh penggunaan : ketika ingin membuat image dari app Linux dan membutuhkan db, maka ketika pembuatan image linux akan eksekusi perintah install db tersebut
//Sehingga ketika image linux tadi dijalankan di container, sudah terdapat db yang diisntall dengan RUN tadi
//Instruksi RUN memiliki 2 format :
RUN <command> //lebih sering digunakan :
RUN mkdir hello
RUN echo "Hello World" > "hello/world.txt"
RUN cat "hello/world.txt"
------------------------------------------
RUN ["<executable file>","<argument>","<...>"] //menggunakan array, lebih ribet jarang digunakan
//note : untuk menampilkan detail ketika build, bisa gunakan perintah --progress=plain
//note : default build docker menggunakan cache, jadi ketika eksekusi build dengan instruksi yang sama dia tidak akan running ulang tapi menggunakan cache
//jika ingin build docker tanpa cache, gunakan perintah --no-cache
docker build -t mhdhasan18/alpine-test-run run --progress=plain --no-cache

//Command Instruction
//CMD atau Command adalah instruksi yang digunakan ketika Docker Container berjalan
//CMD dijalankan ketika docker container berjalan, bukan ketika proses build seperti RUN
//Di docker tidak bisa menambah lebih dari satu instruksi CMD, jika lebih dari satu hanya CMD terakhir yang dieksekusi
//Perintah CMD memiliki beberapa format :
CMD <command> <param> <param> //lebih mudah banyak dipakai
CMD ["<executable file>","<argument>","<argument>"]
CMD ["<param>","<param"] //akan menggunakan executable ENTRY POINT (next materi)
docker build -t mhdhasan18/alpine-test-comand comand //eksekusi create image
docker image inspect mhdhasan18/alpine-test-comand //inspect untuk check cmd di image yang baru dibuat
//Coba check ketika create dan jalankan container
docker container create --name command mhdhasan18/alpine-test-comand //create container dari image tadi
docker container start command //jalankan container, akan langsung mati karena hanya menjalankan 1 CMD
docker container logs command //melihat log, akan tertera container menjalankan CMD tadi yang dibuat (Hello World)