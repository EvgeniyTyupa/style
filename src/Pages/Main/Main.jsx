import React, { useEffect, useRef, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import classes from './Main.module.css';
import Buttons from '../../Components/Buttons/Buttons';
import Scrollspy from 'react-scrollspy'
import RegisterModal from '../../Components/Register/RegisterModal';
import { connect } from 'react-redux';
import Preloader from '../../Components/Preloader/Preloader';

import Aos from 'aos';
import 'aos/dist/aos.css';

import trener1 from '../../Assets/trener1.jpg';
import trener2 from '../../Assets/trener2.jpg';
import garderob from '../../Assets/garderob.jpg';
import collage from '../../Assets/collage.jpg';
import lesson1 from '../../Assets/lesson1.svg';
import lesson2 from '../../Assets/lesson2.svg';
import lesson3 from '../../Assets/lesson3.svg';
import lesson4 from '../../Assets/lesson4.svg';
import quadro from '../../Assets/quadro.svg';
import trener1_1 from '../../Assets/trener1_1.jpg';
import trener2_2 from '../../Assets/trener2_2.jpg';
import fb from '../../Assets/fb.svg';
import insta from '../../Assets/insta.svg';
import arrows from '../../Assets/arrows.svg';
import Burger from '../../Components/Burger/Burger';
import Thankyou from '../../Components/Thankyou/Thankyou';

const Main = (props) => {
    const [scrolledNav, setScrolledNav] = useState(false);
    const [offset, setOffset] = useState(window.scrollY);

    const [active1, setActive1] = useState(true);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);
    const [active4, setActive4] = useState(false);

    const aboutRef = useRef();
    const sheduleRef = useRef();
    const trainersRef = useRef();
    const signupRef = useRef();
    
    const [aboutY, setAboutY] = useState(null);
    const [sheduleY, setSheduleY] = useState(null);
    const [trainersY, setTrainersY] = useState(null);
    const [signupY, setSignupY] = useState(null);

    const [isIsOpenRegister, setIsOpenRegister] = useState(false);

    const [url, setUrl] = useState("");

    const handleScroll = () => {
        if(window.scrollY >= aboutY && window.scrollY <= sheduleY){
            setActive1(true);
            setActive2(false);
            setActive3(false);
            setActive4(false);
        }
        if(window.scrollY >= sheduleY && window.scrollY <= trainersY){
            setActive1(false);
            setActive2(true);
            setActive3(false);
            setActive4(false);
        }
        if(window.scrollY + 1 >= trainersY && window.scrollY <= signupY + 60){
            setActive1(false);
            setActive2(false);
            setActive3(true);
            setActive4(false);
        }
        if(window.scrollY + 1 >= signupY - 30){
            setActive1(false);
            setActive2(false);
            setActive3(false);
            setActive4(true);
        }

        if(window.scrollY > 150){
            setScrolledNav(true);
        }else{
            setScrolledNav(false);
        }
        // console.log("offset: " + window.scrollY)
        // console.log("about: " + aboutY)
        // console.log("shedule: " + sheduleY)
        // console.log("trainers: " + trainersY)
        // console.log("signup: " + signupY)

        // console.log("---------------------------------")
    }
    
    useEffect(() => {
        setUrl(window.location.href);
        const timer = setTimeout(() => {
            setAboutY(aboutRef.current.getBoundingClientRect().top);
            setSheduleY(sheduleRef.current.getBoundingClientRect().top);
            setTrainersY(trainersRef.current.getBoundingClientRect().top)
            setSignupY(signupRef.current.getBoundingClientRect().top)
        }, 500);
       
        Aos.init({ duration: 1000 });

        return ()=> clearTimeout(timer);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return function cleanup(){
            window.removeEventListener('scroll', handleScroll);
        }
    });
    const [isThankyouUrl, setIsThankyouUrl] = useState(false);

    useEffect(() => {
        if(window.location.pathname === "/thankyou"){
            setIsThankyouUrl(true)
        }else{
            setIsThankyouUrl(false);
        }
    },[window.location.pathname]);

    return(
        <div className={classes.main} id="about" ref={aboutRef}>
            {props.isFetching && <Preloader/>}
            {isThankyouUrl && <Thankyou setIsThankyouUrl={setIsThankyouUrl}/>}
            {isIsOpenRegister && <RegisterModal url={url} setIsOpenRegister={setIsOpenRegister}/>}
            {/* NAV */}
            <div className={classes.burger}>
                <Burger active1={active1} active2={active2} active3={active3} active4={active4}/>
            </div>
            <nav className={classes.menu + " " + (scrolledNav && classes.scrolledNav)}>
                <div className={classes.menuContainer}>
                    <Link to="/#about" data-aos="fade-down" className={active1 ? classes.activeLink : ""}>О ЧЕМ</Link>
                    <Link to="/#shedule" data-aos="fade-down" className={active2 ? classes.activeLink : ""}>РАСПИСАНИЕ</Link>
                    <Link to="/#trainers" data-aos="fade-down" className={active3 ? classes.activeLink : ""}>ТРЕНЕРЫ</Link>
                    <Link to="/#signup" data-aos="fade-down" className={active4 ? classes.activeLink : ""}>ЗАПИСАТЬСЯ</Link>
                </div>
            </nav>
            {/* HOME */}
            <div className={classes.home}>
                <div className={classes.homeTop}>
                    <div className={classes.homeHeader}>
                        <h1 data-aos="fade-right" data-aos-delay="800" data-aos-duration="1300">PRO</h1>
                        <h2 data-aos="fade-right" data-aos-delay="800" data-aos-duration="1300">СТИЛЬ</h2>
                        <p data-aos="fade" data-aos-delay="1100" data-aos-duration="1300">онлайн-интенсив</p>
                    </div>
                    <div className={classes.homeImages} data-aos="fade-up" data-aos-delay="400" data-aos-duration="1300">
                        <img src={trener1} alt="trener1"/>
                        <img src={trener2} alt="trener2"/>
                    </div>
                    <span className={classes.beSmartText}>Be Smart, Be Fashion!</span>
                </div>
                <div className={classes.date}>
                    <p>2 апреля - 12 апреля</p>
                </div>
                <div className={classes.buttons} data-aos="fade-down" data-aos-duration="1300">
                    <Buttons setIsOpenRegister={setIsOpenRegister}/>
                </div>
                <p className={classes.garderobText} data-aos="fade-right">Мы знаем, как сделать лучше твой гардероб!</p>
                <p className={classes.garderobTextMobile} data-aos="fade-down">Мы знаем, <br/> как сделать лучше<br/> твой гардероб!</p>
            </div>
            {/* ABOUT */}
            <div className={classes.about}>
                <h2 data-aos="fade-right" data-aos-duration="1300">ТЫ</h2>
                <div className={classes.points}>
                    <div className={classes.pointsContainer}>
                        <p data-aos="fade-left" data-aos-duration="1300">научишься</p>
                        <ul>
                            <li data-aos="fade-right" data-aos-duration="1300">Грамотно структурировать свой гардероб.</li>
                            <li data-aos="fade-right" data-aos-duration="1300">Создавать стильные образы.</li>
                            <li data-aos="fade-right" data-aos-duration="1300">Экономить деньги и время на шопинге.</li>
                            <li data-aos="fade-right" data-aos-duration="1300">Свободно вписывать тренды в свои образы.</li>
                        </ul>
                    </div>
                </div>
                <div className={classes.garderob} data-aos="fade-right" data-aos-duration="1300">
                    <img src={garderob} alt="garderob"/>
                    <div className={classes.garderobBlockText}>
                        <h2>ТЕБЯ</h2>
                        <p>ждет</p>
                        <ul>
                            <li>5 лекций с углублением в современный мир моды.</li>
                            <li>Формирование гардероба с учетом особенностей внешности,
                                фигуры, современных тенденций, 
                                образа жизни и личных вкусовых предпочтений.
                            </li>
                            <li id="shedule" ref={sheduleRef}>Обратная связь стилистов.</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* SHEDULE */}
            <div className={classes.shedule}>
                <div className={classes.collageBlock}>
                    <div className={classes.collageText}>
                        <h2>РАСПИСАНИЕ <br/> ЗАНЯТИЙ</h2>
                        <p className={classes.sheduleNumber}>1 занятие 2 апреля 19.30</p>
                        <p className={classes.sheduleInfo}>
                            Правила создания 
                            индивидуального стиля. 
                            Базовый гардероб. 
                            Формирование капсулы.
                        </p>
                        <hr/>
                        <span>
                            Ты научишься составлять диаграмму 
                            занятости. Узнаешь где брать идеи 
                            для вдохновения и научишься составлять 
                            мудборд. Ты узнаешь, что такое база 
                            и научишься составлять капсулы 
                            для всех жизненных ситуаций.
                        </span>
                    </div>
                    <div className={classes.collageImgBlock}>
                        <img src={collage} alt="collage" data-aos="fade-right" data-aos-duration="1300"/>
                    </div>
                </div>
                <div className={classes.collageBlockReverse}>
                    <div className={classes.collageText}>
                        <p className={classes.sheduleNumber}>2 занятие 5 апреля 19.30</p>
                        <p className={classes.sheduleInfo}>
                            Цвет и его роль в одежде.<br/>
                            Сочетание оттенков и принтов.
                        </p>
                        <hr/>
                        <span>
                            Мы познакомим тебя с психологией цвета 
                            и как это влияет на формирование образа. 
                            Ты поймешь принципы в работе с цветами 
                            и принтами и научишься составлять 
                            гармоничные их сочетания в одежде.
                        </span>
                    </div>
                    <img src={lesson1} alt="lesson1" data-aos="fade-left" data-aos-duration="1300"/>
                </div>
                <div className={classes.collageBlock + " " + classes.adaptiveCollage}>
                    <div className={classes.collageText}>
                        <p className={classes.sheduleNumber}>3 занятие 7 апреля 19.30</p>
                        <p className={classes.sheduleInfo}>
                            Особенности коррекции<br/>
                            фигуры.
                        </p>
                        <hr/>
                        <span>
                            Теперь ты сможешь определить свой 
                            тип фигуры и научишься корректировать 
                            ее с помощью правильно подобранной 
                            одежды. Сможешь определить свои 
                            идеальные пропорции и длины в одежде.
                        </span>
                    </div>
                    <img src={lesson2} className={classes.lessonImage} alt="lesson2" data-aos="fade-right" data-aos-duration="1300"/>
                </div>
                <div className={classes.collageBlockReverse}>
                    <div className={classes.collageText}>
                        <p className={classes.sheduleNumber}>4 занятие 5 апреля 19.30</p>
                        <p className={classes.sheduleInfo}>
                            Тренды весеннего гардероба.<br/>
                            Устаревшие вещи и их <br/>
                            современные аналоги.
                        </p>
                        <hr/>
                        <span>
                            Ты познакомишься с современными 
                            тенденциями и узнаешь, какие вещи еще 
                            долго будут популярными, а от каких вещей 
                            лучше отказаться. А так же узнаешь чем 
                            можно заменить твои устаревшие вещи. 
                        </span>
                    </div>
                    <img src={lesson3} className={classes.lessonReverseImage} alt="lesson3" data-aos="fade-left" data-aos-duration="1300"/>
                </div>
                <div className={classes.collageBlock + " " + classes.adaptiveCollage}>
                    <div className={classes.collageText}>
                        <p className={classes.sheduleNumber}>5 занятие 12 апреля 19.30</p>
                        <p className={classes.sheduleInfo}>
                            Разбор гардероба.<br/>
                            Правила онлайн <br/>
                            и офлайн шопинга.
                        </p>
                        <hr/>
                        <span>
                            Ты получишь четкую пошаговую 
                            инструкцию для качественного разбора 
                            гардероба. Научишься составлять 
                            шопинг-лист и узнаешь о всех тонкостях 
                            как офлайн, так и онлайн шопинга.
                        </span>
                    </div>
                    <img src={lesson4} className={classes.lessonImage + " " + classes.lastImg} alt="lesson4" data-aos="fade-right" data-aos-duration="1300"/>
                </div>
            </div>
            {/* INFO */}
            <div className={classes.info}>
                <img src={quadro} alt="quadro" data-aos="zoom-in" data-aos-duration="500"/>
                <p data-aos="fade" data-aos-duration="1300">После лекций ты получишь ВСЕ записи и материалы курса, 
                    которые можешь просматривать в любое время.
                </p>
                <p data-aos="fade" data-aos-duration="1300">
                    Все лекции и дополнительные материалы будут доступны 
                    в течении шести месяцев после окончания курса.
                </p>
                <p data-aos="fade" data-aos-duration="1300">
                    Telegram-чат со всеми участниками курса для общения 
                    и обсуждения заданий.
                </p>
                <p data-aos="fade" data-aos-duration="1300">
                    Мы отправим тебе чек-листы и интересные статьи по нашим темам.
                </p>
            </div>
            <span id="trainers" ref={trainersRef}></span>
            <div className={classes.buttons} data-aos="fade-down" data-aos-duration="1300">
                <Buttons setIsOpenRegister={setIsOpenRegister}/>
            </div>
            {/* TRAINERS */}
            <div className={classes.trainers}>
                <h2 data-aos="fade-down" data-aos-duration="1300">ТРЕНЕРЫ КУРСА:</h2>
                <div className={classes.trener} data-aos="fade-left" data-aos-duration="1300">
                    <img src={trener1_1} alt="trener" className={classes.trenerImage}/>
                    <div className={classes.trenerInfo}>
                        <h3>Анна Николенко</h3>
                        <div className={classes.trenerLinks}>
                            <a target="_blank" href="https://www.facebook.com/aneta.nikolenko">
                                <img src={fb} alt="fb"/>
                            </a>
                            <a target="_blank" href="https://www.instagram.com/anita_nikolenko">
                                <img src={insta} alt="insta"/>
                            </a>
                        </div>
                        <div className={classes.trenerWho}>
                            <p>Имидж-дизайнер проекта Profi Fashion;</p>
                            <p>Член Ассоциации стилистов Украины;</p>
                            <p>Соосновательница бренда одежды ANude sportswear;</p>
                            <p>Спикер модных изданий;</p>
                        </div>
                        <div className={classes.trenerSubInfo}>
                            <h4>Автор программ по стилю:</h4>
                            <p>Онлайн-лекция: о типажах фигур и подборе фасонов</p>
                            <p>Онлайн-лекция: Домашняя фотосессия, от идеи до реализации</p>
                            <p>Онлайн-лекция: Коды внешности</p>
                        </div>
                        <div className={classes.trenerSubInfo}>
                            <h4>Соавтор курсов:</h4>
                            <p>Онлайн-интенсив: Гардероб. Перезагрузка.</p>
                            <p>Онлайн-интенсив: Pro Стиль</p>
                            <p>Онлайн-интенсив: Pro Стиль (winter edition)</p>
                        </div>
                    </div>
                </div>
                <div className={classes.dopInfo} data-aos="fade-right" data-aos-duration="1300">
                    <p className={classes.dopHeader}>
                        Анна прошла обучение в Международном учебном центре <br/>
                        «Bogomolov’ Image School».
                    </p>
                    <p>Училась у лучших экспертов в мире моды:</p>
                    <ul>
                        <li>Константина Богомолова - имидж-дизайнер и аналитик моды, руководитель Международного учебного центра «Bogomolov’ Image School»;</li>
                        <li>Элги Хомицкой - имидж-дизайнер, руководитель “Elga Homitska Image House”</li>
                        <li>Нади Агеевой - директор Международной Школы Стиля и Имиджа;</li>
                        <li>Аны Варавы - редактор L’Officiel Украина;</li>
                        <li>Лианы Белякович - аналитик, прогнозист моды;</li>
                        <li>Леси Патоки - основательница Patoka Studio.</li>
                    </ul>
                </div>
                <img src={arrows} className={classes.arrows}/>
                <div className={classes.trenerReverse} data-aos="fade-down" data-aos-duration="1300">
                    <img src={trener2_2} alt="trener" className={classes.trenerImage}/>
                    <div className={classes.trenerInfo}>
                        <h3>Евгения Донцова</h3>
                        <div className={classes.trenerLinks}>
                            <a target="_blank" href="https://www.facebook.com/evgndntsv">
                                <img src={fb} alt="fb"/>
                            </a>
                            <a target="_blank" href="https://www.instagram.com/stylist_dontsova">
                                <img src={insta} alt="insta"/>
                            </a>
                        </div>
                        <div className={classes.trenerWho + " " + classes.donc}>
                            <p>стилист проекта Profi Fashion;</p>
                            <p>Член Ассоциации стилистов Украины;</p>
                            <p>художник по костюмам в Театр искренних непрофессиональных актеров;</p>
                            <p>Спикер модных изданий;</p>
                        </div>
                        <div className={classes.trenerSubInfo}>
                            <h4>Автор программ по стилю:</h4>
                            <p>Онлайн-лекция: Подготовка к групповой фотосессии, от идеи до реализации</p>
                            <p>Онлайн-лекция: Коды внешности</p>
                        </div>
                        <div className={classes.trenerSubInfo}>
                            <h4>Соавтор курсов:</h4>
                            <p>Онлайн-интенсив: Гардероб. Перезагрузка.</p>
                            <p>Онлайн-интенсив: Pro Стиль</p>
                            <p>Онлайн-интенсив: Pro Стиль (winter edition)</p>
                        </div>
                    </div>
                </div>
                <div className={classes.dopInfo} data-aos="fade-left" data-aos-duration="1300">
                    <p>Евгения обучалась:</p>
                    <ul>
                        <li>Академия стиля и дизайна Andre TAN по специальности “Стилист”, “Дизайн одежды”, “Fashion иллюстрация”;</li>
                        <li>Киевский учебный центр “Лыбидь”, по программе “Мода, стиль и дизайн одежды”;</li>
                        <li>Открытый международный университет развития человека “Украина”, бакалавр по специальности “Искусствоведение”;</li>
                        <li>Национальная академия руководящих кадров культуры и искусств, магистр по специальности “Дизайн среды”;</li>
                    </ul>
                    <span></span>
                </div>
                
            </div>
            <div className={classes.buttons} data-aos="fade-down" data-aos-duration="1300" id="signup" ref={signupRef}>
                <Buttons setIsOpenRegister={setIsOpenRegister}/>
            </div>
            {/* PAYMENT */}
            <div className={classes.payment}>
                <span data-aos="fade" data-aos-duration="1300">Стоимость курса</span>
                <p data-aos="fade-up" data-aos-duration="1300" data-aos-delay="400">750 грн / 29 $</p>
                <hr/>
            </div>
            {/* FOOTER */}
            <footer className={classes.footer}>
                <div className={classes.links}>
                    <h5>Мы в соц.сетях</h5>
                    <div className={classes.linksContainer}>
                        <a target="_blank" href="https://www.facebook.com/profifashion">
                            <img src={fb} alt="fb"/>
                        </a>
                        <a target="_blank" href="https://www.instagram.com/profi.fashion">
                            <img src={insta} alt="insta"/>
                        </a>
                    </div>
                </div>
                <div className={classes.publications} data-aos="fade-down" data-aos-duration="1600" data-aos-delay="300">
                    <h5>Наши публикации:</h5>
                    <a target="_blank" href="https://www.profispace.media/ru/2020/12/25/idei-stilnh-podarkov">Как с иголочки: идеи стильных подарков <br/>к Новому году</a>
                    <a target="_blank" href="https://www.profispace.media/ru/2020/11/07/na-stile-12-glavnh-modnh-trendov-osen-zima-2020-2021">На стиле: 12 главных модных трендов <br/> осень-зима 2020-2021</a>
                    <a target="_blank" href="https://www.profispace.media/ru/2020/10/02/kak-sozdat-jenskii-osennii-ofisni-garderob-sovet-imidj-dizainera/?fbclid=IwAR2GYm-pZCrRGgAvw2VFsthtkXifwJlYqEBMqtr_2S2fJnFIh_zRrT4FlfU">Как создать женский осенний офисный гардероб: <br/>советы имидж-дизайнера</a>
                    <a target="_blank" href="http://www.profi-fashion.com/geometriya-vneshnosti-ili-kak-rabotaet-teoriya-kibbi-na-praktike">Геометрия внешности на практике по теории Кибби</a>
                    <a target="_blank" href="http://www.profi-fashion.com/business-style">Бизнес стиль: дикие и профессиональные</a>
                </div>
            </footer>
        </div>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching
});

export default connect(mapStateToProps, {})(Main);