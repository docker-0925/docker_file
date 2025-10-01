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

//Label Instruction
//LABEL -> instruksi untuk menambahkan metadata ke dalam docker image yang dibuat
//Metadata adalah informasi tambahan seperti nama aplikasi, pembuat, website, perusahaan, lisensi, dll
//Metadata hanya sebagai informasi saja, tidak akan digunakan ketika menjalankan docker container
LABEL <key>=<value>
LABEL <key1>=<value1> <key2>=<value2> ... //bisa beberapa key value
docker build -t mhdhasan18/alpine-test-label label //eksekusi create image
docker image inspect mhdhasan18/alpine-test-label //inspect untuk check informasi label di image yang baru dibuat

//Add Instruction
//ADD -> instruksi untuk menambahkan file dari source (host file/url) ke dalam folder destination di docker image
//ADD bisa mendeteksi apakah sebuah file source merupakan file kompres (targz, zip, dll). Jika iya maka akan otomatis di ekstrak di destination folder
//ADD juga bisa mendukung banyak penambahan file sekaligus, instruksi ADD memiliki format :
ADD <source> <destination>
ADD world.txt hello //Tambah file world.txt ke folder hello
ADD *.txt hello //Tambah semua file .txt ke folder hello
docker build -t mhdhasan18/alpine-test-add add //create image
docker container create --name add mhdhasan18/alpine-test-add //create container dari image tadi
docker container start add //jalankan container, akan langsung mati karena hanya menjalankan 1 CMD
docker container logs add //melihat log, akan tertera container menjalankan CMD tadi yang dibuat (Hello World)

//Copy Instruction
//COPY -> untuk menambahkan file dari source ke dalam folder destination di docker image
//COPY hanya melakukan copy, Jika ADD selaian melakukan copy, bisa mendownload source dari URL dan otomatis ekstrak file kompres
//Namun disarankan hanya gunakan COPY saja, jika butuh ekstrak kompres maka gunakan RUN dan jalankan app untuk ektract file kompres tsb
COPY <source> <destination>
COPY world.txt hello //Tambah file world.txt ke folder hello
COPY *.txt hello //Tambah semua file .txt ke folder hello
docker build -t mhdhasan18/alpine-test-copy copy //create image
docker container create --name copy mhdhasan18/alpine-test-copy //create container dari image tadi
docker container start copy //jalankan container
docker container logs copy //melihat log, akan tertera

//Dockerignore File
//Saat melakukan ADD/COPY instruksi dari file source, docker akan membaca dulu file yang bernama .dockerignore
//Sama seperti .gitignore, bisa menyertakan file apa saja yang ingin dihiraukan tidak di ADD/COPY di .dockerignore
//File .gitignore juga mendukung ignore folder/menggunakan regular expression
docker build -t mhdhasan18/alpine-test-ignore ignore

//Expose Instruction
//EXPOSE -> instruksi untuk memberitahu bahwa container akan listen port pada nomor & protocol tertentu
//EXPOSE tidak akan mempublish port, hanya untuk dokumentasi memberitahu yang membuat container bahwa image tsb akan main di port tertentu ketika dijalankan
//Format instruksi EXPOSE :
EXPOSE <port> //default menggunakan TCP
EXPOSE <port>/tcp
EXPOSE <port>/udp
docker build -t mhdhasan18/alpine-test-expose expose
docker image inspect mhdhasan18/alpine-test-expose //akan tertera bagian ExposedPorts
docker container create --name expose -p 8080:8080 mhdhasan18/alpine-test-expose //buat container dengan expose port yang sudah diset tadi
docker container start expose //Kemudian memastikan bisa diakses dari host port nya

//Environment Variable Instruction
//ENV -> instruksi untuk mengubah environment variable, baik ketika tahapan build/ketika jalan dalam docker container
//ENV yg sudah didefinisikan dalam Dockerfile bisa digunakan kembali dengan menggunakan sintaks ${NAMA_ENV}
//Environment variable yg dibuat menggunakan instruksi ENV disimpan dalam docker image & bisa dilihat menggunakan perintah docker image inspect
//Environment variable juga bisa diganti nilainya ketika pembuatan docker container dengan perintah docker container create ==env <key>=<value>
//Format instruksi ENV :
ENV <key>=<value>
ENV <key1>=<value1> <key2>=<value2>
docker build -t mhdhasan18/alpine-test-env env
docker image inspect mhdhasan18/alpine-test-env //sudah bisa dicek terdapat dibagian Env dengan default port (8080)
docker container create --name env --env APP_PORT=9090 -p 9090:9090 mhdhasan18/alpine-test-env //create container dengan mengganti default port env

//Volume Instruction
//VOLUME -> untuk membuat volume secara otomatis ketika kita membuat docker container
//Semua file di volume otomatis akan dicopy ke docker volume, walaupun tidak membuat docker containernya, sehingga data lebih aman
//Format instruksi VOLUME :
VOLUME </lokasi/folder>
VOLUME </lokasi/folder1> </lokasi/folder2> ..
VOLUME ["</lokasi/folder1>" "</lokasi/folder2>" ".."]

//Working Directory Instruction
//WORKDIR -> untuk menentukan direktori/folder untuk menjalankan instruksi RUN,CMD,ENTRYPOINT,COPY & ADD
//Jika WORKDIR tidak ada otomatis direktorinya akan dibuat, dan setelah ditentukan maka akan dijaditkan tempat menjalankan instruksi selanjutnya
//Jika WORKDIR adalah relative path, maka otomatis akan masuk ke directory dari WORKDIR sebelumnya
//WORKDIR juga bisa digunakan sebagai path untuk lokasi pertama kali masuk ke dalam docker container
//Format instruksi WORKDIR adalah :
WORKDIR /app //working directorynya adalah /app (absolute path)
WORKDIR docker //working directorynya adalah /app/docker (relative path)
WORKDIR /home/app //sekarang working directorynya adalah /home/app
docker build -t mhdhasan18/alpine-test-workdir workdir
docker container create --name workdir -p 8080:8080 mhdhasan18/alpine-test-workdir
docker container start workdir
docker container exec -i -t workdir /bin/sh //cek dengan pwd untuk melihat detail folde di dalamnya