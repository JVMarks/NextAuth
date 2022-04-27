import Head from "next/head";
import { useState, FormEvent, useContext } from "react"
import { AuthContext } from '../contexts/AuthContext'

import styles from '../styles/Home.module.css';


export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password
    }

    console.log(data)
    await signIn(data);
  }

  return (
    <div className={styles.container}>

      <Head>
        <title>Next Auth</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>

      <form onSubmit={handleSubmit} className={styles.coniner}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
