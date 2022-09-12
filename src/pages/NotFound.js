import emoji from '../assets/img/emoji.png';

const NotFound = () => {
  return (
    <div class="container">
      <div className="not-found__inner">
          <img className="not-found__img" src={emoji} alt="Грустный смайлик"/>
          <h1 className="not-found__title">Ничего не найдено</h1>
          <p className="not-found__text">К сожалени данная страница отсутствует в нашем интернет-магазине</p>
      </div>
    </div>
  );
};

export default NotFound;
