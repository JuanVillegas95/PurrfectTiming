import styles from './layout.module.css'

export default function NotFound(){
  return (
    <>
      <div className={styles.error_card}>
        <h1>Not found</h1>
        <p>Could not found requested resource HIII</p>
      </div>
    </>
  )
}