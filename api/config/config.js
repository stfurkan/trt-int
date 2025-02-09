import dotenv from 'dotenv';
dotenv.config();

export default {
  server: {
    port: 3001
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },
  apis: {
    fra: 'https://www.trtfrancais.com/api/homepage',
    ara: 'https://www.trtarabi.com/api/homepage',
    bos: 'https://bhsc.trtbalkan.com/api/homepage',
    alb: 'https://albanian.trtbalkan.com/api/homepage',
    mkd: 'https://macedonian.trtbalkan.com/api/homepage',
    rus: 'https://www.trtrussian.com/api/homepage',
    deu: 'https://www.trtdeutsch.com/api/homepage'
  }
};
