import styles from '../layout.module.css'
import monke_login from '@images/monke_login.png'
import Link from 'next/link'

export default function Login() {
  return (
    <>
      <img className={styles.monke_login} src={monke_login.src} alt="Monkey" />
      <form className={styles.form} action="">

        <input className={styles.input} name="email" type="email" placeholder="email"/>

        <input className={styles.input} name="password" type="email"  placeholder="password"/>

        <a href=""></a>
        <button className={styles.button} type="submit">Sign Up</button>
      </form>
    </>
  )
}