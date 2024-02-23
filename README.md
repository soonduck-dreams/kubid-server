# KUBID

KUBID는 고려대학교 학생들을 위한 경매형 중고 거래 서비스입니다.
하한가와 상한가를 설정해서 상품을 등록하면 경매가 시작됩니다. 구매자들의 입찰이 진행되고 판매자는 원하는 가격에 낙찰할 수 있습니다.

# Project Setup

## Database

Default DBMS is mysql/mariadb. Install mysql/mariadb and create database with the name you want. If you want to use another DBMS, you can change the `dataSource.ts` file in the `src/config` directory.

## Environment Variable

If you are in development mode, create a `.env.dev` file in the root directory of the project and add the following variables:

```
CLIENT_URL=http://localhost:5173

PORT=3000 # port on which the server will listen

DB_HOST=localhost # host(ip) of the database
DB_PORT=3306 # port of the database
DB_USER=root # username of the database
DB_PASSWORD=pwd # password of the database
DB_NAME=kubid # name of the database, which you created in the previous step

JWT_SECRET_KEY='jwtkeyexample'
```

If you are in production mode, create a `.env.prod` file in the root directory of the project and add the above configuration variables with the appropriate values.

## Execution

Execute the following commands in the root directory of the project to run the server according to the mode you want.

### Development Mode

```bash
npm install
npm run dev
```

### Production Mode

```bash
npm install
npm run build
npm run prod
```
