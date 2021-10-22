import loader from '../../assets/loader.png'
import style from './Preloader.module.css'

export function Preloader() {
  return (
    <div className={style.preloader}>
      <img src={loader}/>
    </div>
  )
}