import { notFound } from "next/navigation"
import styles from './layout.module.css'
import hardCodedMonkeImageWallpaper from '@images/wallpaper.jpeg'


const profileIds: String[] = ["Marta", "Juan", "Pablo"];
const comments: String[] = ["Marta", "Juan", "Pablo"];

export default function Profiles({ params }: { params: { profileId: string } }) {
  if (!profileIds.includes(params.profileId)) {
    notFound();
  }

  return (
    <>
      <section className={styles.profile_card}>
        <header className={styles.header}>
          <div className={styles.wallpaper_profile}>
            <img src={hardCodedMonkeImageWallpaper.src} alt="profile-image" />
          </div>
          <div className={styles.profile_picture}>
            <img src={hardCodedMonkeImageWallpaper.src} alt="wallpaper-image" />
          </div>
        </header>
        <main className={styles.main}>
          <aside className={styles.information}>
            <h1>{params.profileId}'s Profile</h1>
            <ul>
              <li>Last Online</li>
              <li>Gender</li>
              <li>Birthday</li>
              <li>Location</li>
              <li>Joined</li>
            </ul>
          </aside>
          <aside className={styles.comment}>
              <input type="text" placeholder="comment"/>
              {comments.map((comment) =>{
                return <p>
                  {comment}
                </p>
              })}
          </aside>
        </main>
    </section >
    </>
  )
}