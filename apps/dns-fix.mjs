import dns from 'dns';
if (process.env.NODE_ENV === 'development') {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
}