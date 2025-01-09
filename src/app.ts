import 'colors';
import session from 'cookie-session';
import { sql } from 'drizzle-orm';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import { env, validateEnv } from './config/env.config';
import { db } from './db';
import { NotFoundException } from './lib/exceptions';
import { devConsole, sessionOptions } from './lib/utils';
import { handleErrorRequest } from './middlewares/handle-error-request';
import { openApiSpecs, serveApiReference } from './openapi';
import { GoogleStrategy } from './passport/google.strategy';
import { serializer } from './passport/serializer';
import { authRoute } from './routes/auth.route';
import { userRoute } from './routes/user.route';

console.log('hello');
const app = express();
validateEnv();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (env.NODE_ENV === 'development') {
  app.use(morgan('common'));
}

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use('google', GoogleStrategy);
serializer();

app.get('/', async (req, res) => {
  const [result] = await db.execute(sql`select version()`);
  res.json({
    result,
    message: 'Api is running fine...',
    env: env.NODE_ENV,
    date: new Date().toISOString(),
    database: result
  });
});

/* --------- routes --------- */
app.use('/api/auth', authRoute);
app.get('/doc', (req, res) => {
  res.json(openApiSpecs);
});
app.get('/reference', serveApiReference);

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

app.use(async () => {
  throw new NotFoundException();
});
app.use(handleErrorRequest);

app.listen(env.PORT, () => {
  devConsole(`⚡[Server]: listening at http://localhost:${env.PORT}`.yellow);
});

export default app;
