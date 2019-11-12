upstream my_http_servers {
    least_conn;
    server node1:3000;     
    server node2:3001;      
}

server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    location / {
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   Host      $http_host;
        proxy_pass         http://my_http_servers;
    }
}