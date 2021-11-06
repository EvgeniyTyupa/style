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

import { useTranslation } from "react-i18next";

import logo from '../../Assets/logo.jpg';
import trener1 from '../../Assets/trener1.jpg';
import trener2 from '../../Assets/trener2.jpg';
import garderob from '../../Assets/garderob.jpg';
import collage from '../../Assets/collage.jpg';
import lesson1 from '../../Assets/less2.JPG';
import lesson2 from '../../Assets/less3.png';
import lesson3 from '../../Assets/less4.png';
import lesson4 from '../../Assets/lesson4.svg';
import quadro from '../../Assets/quadro.svg';
import trener1_1 from '../../Assets/trener1_1.jpg';
import trener2_2 from '../../Assets/trener2_2.jpg';
import fb from '../../Assets/fb.svg';
import insta from '../../Assets/insta.svg';
import arrows from '../../Assets/arrows.svg';
import Burger from '../../Components/Burger/Burger';
import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import Thankyou from '../../Components/Thankyou/Thankyou';
import { setIsRegistered } from '../../Redux/commonReducer';

const useStyles = makeStyles({
    root: {
        '& .MuiInputBase-root': {
            fontSize: "2rem",
            fontWeight: 300
        },
        '& .MuiInput-underline:before':{
            borderBottom: 0
        },
        '& .MuiInput-underline:after':{
            borderBottom: "2px solid #7C0061"
        }
    }
})


const Main = (props) => {
    const material = useStyles();

    const { t, i18n } = useTranslation();

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
        if(props.isRegistered) {
            window.location.pathname = "/thankyou"
        }
    }, [props.isRegistered])

    useEffect(() => {
        if(window.location.pathname === "/thankyou"){
            setIsThankyouUrl(true)
        }else{
            props.setIsRegistered(false)
            setIsThankyouUrl(false);
        }
    },[window.location.pathname]);

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
    }

    return(
        <div className={classes.main} id="about" ref={aboutRef}>
            {props.isFetching && <Preloader/>}
            {isThankyouUrl && <Thankyou setIsThankyouUrl={setIsThankyouUrl}/>}
            {isIsOpenRegister && <RegisterModal url={url} setIsOpenRegister={setIsOpenRegister}/>}
            {/* NAV */}
            <div className={classes.burger}>
                <Burger changeLanguage={changeLanguage} active1={active1} active2={active2} active3={active3} active4={active4}/>
            </div>
            <nav className={classes.menu + " " + (scrolledNav && classes.scrolledNav)}>
                <div className={classes.menuContainer}>
                    <img src={logo} alt="logo" className={classes.logo}/>
                    <Link to="/#about" data-aos="fade-down" className={active1 ? classes.activeLink : ""}>{t("menu.one")}</Link>
                    <Link to="/#shedule" data-aos="fade-down" className={active2 ? classes.activeLink : ""}>{t("menu.two")}</Link>
                    <Link to="/#trainers" data-aos="fade-down" className={active3 ? classes.activeLink : ""}>{t("menu.three")}</Link>
                    <Link to="/#signup" data-aos="fade-down" className={active4 ? classes.activeLink : ""}>{t("menu.four")}</Link>
                    <TextField classes={material} select name="lang" onChange={changeLanguage} defaultValue="ua">
                        <MenuItem value="ru">RU</MenuItem>
                        <MenuItem value="ua">UA</MenuItem>
                    </TextField>
                </div>
            </nav>
            {/* HOME */}
            <div className={classes.home}>
                <div className={classes.homeTop}>
                    <div className={classes.homeHeader}>
                        <h1 data-aos="fade-right" data-aos-delay="800" data-aos-duration="1300">PRO</h1>
                        <h2 data-aos="fade-right" data-aos-delay="800" data-aos-duration="1300">СТИЛЬ</h2>
                        <p data-aos="fade" data-aos-delay="1100" data-aos-duration="1300">{t("home.online")}</p>
                    </div>
                    <div className={classes.homeImages} data-aos="fade-up" data-aos-delay="400" data-aos-duration="1300">
                        <img src={trener1} alt="trener1"/>
                        {/* <img src={trener2} alt="trener2"/> */}
                    </div>
                    <span className={classes.beSmartText}>Be Smart, Be Fashion!</span>
                </div>
                <div className={classes.date}>
                    <p>{t("home.date")}</p>
                </div>
                <div className={classes.buttons} data-aos="fade-down" data-aos-duration="1300">
                    <Buttons setIsOpenRegister={setIsOpenRegister}/>
                </div>
                <p className={classes.garderobText} data-aos="fade-right">{t("garderobText")}</p>
                <p className={classes.garderobTextMobile} data-aos="fade-down">{t("garderobTextMobile.we")} <br/> {t("garderobTextMobile.more")}<br/> {t("garderobTextMobile.garderob")}</p>
            </div>
            {/* ABOUT */}
            <div className={classes.about}>
                <h2 data-aos="fade-right" data-aos-duration="1300">{t("about.you")}</h2>
                <div className={classes.points}>
                    <div className={classes.pointsContainer}>
                        <p data-aos="fade-left" data-aos-duration="1300">{t("about.learn")}</p>
                        <ul>
                            <li data-aos="fade-right" data-aos-duration="1300">{t("about.pointOne")}</li>
                            <li data-aos="fade-right" data-aos-duration="1300">{t("about.pointTwo")}</li>
                            <li data-aos="fade-right" data-aos-duration="1300">{t("about.pointThree")}</li>
                            <li data-aos="fade-right" data-aos-duration="1300">{t("about.pointFour")}</li>
                        </ul>
                    </div>
                </div>
                <div className={classes.garderob} data-aos="fade-right" data-aos-duration="1300">
                    <img src={garderob} alt="garderob"/>
                    <div className={classes.garderobBlockText}>
                        <h2>{t("about.forYou")}</h2>
                        <p>{t("about.wait")}</p>
                        <ul>
                            <li>{t("about.pointSix")}</li>
                            <li>{t("about.pointSeven")}</li>
                            <li id="shedule">{t("about.pointEight")}</li>
                            <li id="shedule">{t("about.pointNine")}</li>
                            <li id="shedule" ref={sheduleRef}>{t("about.pointTen")}</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* SHEDULE */}
            <div className={classes.shedule}>
                <div className={classes.collageBlock}>
                    <div className={classes.collageText}>
                        <h2>{t("shedule.titleOne")} <br/> {t("shedule.titleTwo")}</h2>
                        <p className={classes.sheduleNumber}>{t("shedule.lessonOneTitle")}</p>
                        <p className={classes.sheduleInfo}>{t("shedule.lessonOneInfo")}</p>
                        <hr/>
                        <div className={classes.pointsShedule}>
                            <p><span> - {t("shedule.lessonOneSub.one")}</span></p>
                            <p><span> - {t("shedule.lessonOneSub.two")}</span></p>
                            {/* <p><span> - {t("shedule.lessonOneSub.three")}</span></p> */}
                            <p><span> - {t("shedule.lessonOneSub.four")}</span></p>
                            <p><span> - {t("shedule.lessonOneSub.five")}</span></p>
                        </div>
                    </div>
                    <div className={classes.collageImgBlock}>
                        <img src={collage} alt="collage" data-aos="fade-right" data-aos-duration="1300"/>
                    </div>
                </div>
                <div className={classes.collageBlockReverse}>
                    <div className={classes.collageText}>
                        <p className={classes.sheduleNumber}>{t("shedule.lesson2.title")}</p>
                        <p className={classes.sheduleInfo}>
                            {t("shedule.lesson2.info")}<br/>
                            {/* {t("shedule.lesson2.info1")} */}
                        </p>
                        <hr/>
                        <div className={classes.pointsShedule}>
                            <p><span> - {t("shedule.lesson2.lessonTwoSub.one")}</span></p>
                            <p><span> - {t("shedule.lesson2.lessonTwoSub.two")}</span></p>
                            <p><span> - {t("shedule.lesson2.lessonTwoSub.three")}</span></p>
                        </div>
                    </div>
                    <img className={classes.lessonImagePic} src={lesson1} alt="lesson1" data-aos="fade-left" data-aos-duration="1300"/>
                </div>
                <div className={classes.collageBlock + " " + classes.adaptiveCollage}>
                    <div className={classes.collageText}>
                        <p className={classes.sheduleNumber}>{t("shedule.lesson3.title")}</p>
                        <p className={classes.sheduleInfo}>
                            {t("shedule.lesson3.info")}<br/>
                            {t("shedule.lesson3.info1")}
                        </p>
                        <hr/>
                        <div className={classes.pointsShedule}>
                            <p><span> - {t("shedule.lesson3.lessonThreeSub.one")}</span></p>
                            <p><span> - {t("shedule.lesson3.lessonThreeSub.two")}</span></p>
                            <p><span> - {t("shedule.lesson3.lessonThreeSub.three")}</span></p>
                        </div>
                    </div>
                    <img  src={lesson2} className={classes.lessonImage} alt="lesson2" data-aos="fade-right" data-aos-duration="1300"/>
                </div>
                <div className={classes.collageBlockReverse}>
                    <div className={classes.collageText}>
                        <p className={classes.sheduleNumber}>{t("shedule.lesson4.title")}</p>
                        <p className={classes.sheduleInfo}>
                            {t("shedule.lesson4.info")}
                        </p>
                        <hr/>
                        <div className={classes.pointsShedule}>
                            <p><span> - {t("shedule.lesson4.lessonSub.one")}</span></p>
                            <p><span> - {t("shedule.lesson4.lessonSub.two")}</span></p>
                            <p><span> - {t("shedule.lesson4.lessonSub.three")}</span></p>
                        </div>
                    </div>
                    <img src={lesson3} className={classes.lessonReverseImage} alt="lesson3" data-aos="fade-left" data-aos-duration="1300"/>
                </div>
                <div className={classes.collageBlock + " " + classes.adaptiveCollage}>
                    <div className={classes.collageText}>
                        <p className={classes.sheduleNumber}>{t("shedule.lesson5.title")}</p>
                        <p className={classes.sheduleInfo}>
                            {t("shedule.lesson5.info")}
                        </p>
                        <hr/>
                        <div className={classes.pointsShedule}>
                            <p><span> - {t("shedule.lesson5.lessonSub.one")}</span></p>
                            <p><span> - {t("shedule.lesson5.lessonSub.two")}</span></p>
                        </div>
                    </div>
                    <img src={lesson4} className={classes.lessonImage + " " + classes.lastImg} alt="lesson4" data-aos="fade-right" data-aos-duration="1300"/>
                </div>
            </div>
            {/* INFO */}
            <div className={classes.info}>
                <img src={quadro} alt="quadro" data-aos="zoom-in" data-aos-duration="500"/>
                <p data-aos="fade" data-aos-duration="1300">{t("info.one")}</p>
                <p data-aos="fade" data-aos-duration="1300">{t("info.two")}</p>
                <p data-aos="fade" data-aos-duration="1300">{t("info.three")}</p>
                <p data-aos="fade" data-aos-duration="1300">{t("info.four")}</p>
            </div>
            <span id="trainers" ref={trainersRef}></span>
            <div className={classes.buttons} data-aos="fade-down" data-aos-duration="1300">
                <Buttons setIsOpenRegister={setIsOpenRegister}/>
            </div>
            {/* TRAINERS */}
            <div className={classes.trainers}>
                <h2 data-aos="fade-down" data-aos-duration="1300">{t("treners.title")}</h2>
                <div className={classes.trener} data-aos="fade-left" data-aos-duration="1300">
                    <img src={trener1_1} alt="trener" className={classes.trenerImage}/>
                    <div className={classes.trenerInfo}>
                        <h3>{t("treners.one.title")}</h3>
                        <div className={classes.trenerLinks}>
                            <a target="_blank" href="https://www.facebook.com/aneta.nikolenko">
                                <img src={fb} alt="fb"/>
                            </a>
                            <a target="_blank" href="https://www.instagram.com/anita_nikolenko">
                                <img src={insta} alt="insta"/>
                            </a>
                        </div>
                        <div className={classes.trenerWho}>
                            <p>{t("treners.one.who.one")}</p>
                            <p>{t("treners.one.who.two")}</p>
                            <p>{t("treners.one.who.three")}</p>
                            <p>{t("treners.one.who.four")}</p>
                        </div>
                        <div className={classes.trenerSubInfo}>
                            <h4>{t("treners.one.sub.one")}</h4>
                            <p>{t("treners.one.sub.two")}</p>
                            <p>{t("treners.one.sub.three")}</p>
                            <p>{t("treners.one.sub.four")}</p>
                            <p>{t("treners.one.sub.six")}</p>
                        </div>
                        {/* <div className={classes.trenerSubInfo}>
                            <h4>{t("treners.one.sub.five")}</h4>
                            
                            <p>{t("treners.one.sub.seven")}</p>
                            <p>{t("treners.one.sub.eight")}</p>
                        </div> */}
                    </div>
                </div>
                <div className={classes.dopInfo} data-aos="fade-right" data-aos-duration="1300">
                    <h4>{t("treners.one.dop.one_title")}</h4>
                    <p className={classes.dopHeader}>
                        - {t("treners.one.dop.one")}<br/>
                        "Bogomolov’ Image School". <br/>
                        - {t("treners.one.dop.one1")}<br/>
                        "Nigay School"
                    </p>
                    <p>{t("treners.one.dop.two")}</p>
                    <ul>
                        <li>{t("treners.one.dop.three")} “Bogomolov’ Image School”.</li>
                        <li>{t("treners.one.dop.four")}</li>
                        <li>{t("treners.one.dop.five")}</li>
                        <li>{t("treners.one.dop.six")}</li>
                        <li>{t("treners.one.dop.seven")}</li>
                        <li>{t("treners.one.dop.eight")}</li>
                        <li>{t("treners.one.dop.nine")}</li>
                        <li>{t("treners.one.dop.ten")}</li>
                    </ul>
                </div>
                {/* <img src={arrows} className={classes.arrows}/>
                <div className={classes.trenerReverse} data-aos="fade-down" data-aos-duration="1300">
                    <img src={trener2_2} alt="trener" className={classes.trenerImage}/>
                    <div className={classes.trenerInfo}>
                        <h3>{t("treners.two.title")}</h3>
                        <div className={classes.trenerLinks}>
                            <a target="_blank" href="https://www.facebook.com/evgndntsv">
                                <img src={fb} alt="fb"/>
                            </a>
                            <a target="_blank" href="https://www.instagram.com/stylist_dontsova">
                                <img src={insta} alt="insta"/>
                            </a>
                        </div>
                        <div className={classes.trenerWho + " " + classes.donc}>
                            <p>{t("treners.two.who.one")}</p>
                            <p>{t("treners.two.who.two")}</p>
                            <p>{t("treners.two.who.three")}</p>
                            <p>{t("treners.two.who.four")}</p>
                        </div>
                        <div className={classes.trenerSubInfo}>
                            <h4>{t("treners.two.sub.one")}</h4>
                            <p>{t("treners.two.sub.two")}</p>
                            <p>{t("treners.two.sub.three")}</p>
                        </div>
                        <div className={classes.trenerSubInfo}>
                            <h4>{t("treners.two.sub.four")}</h4>
                            <p>{t("treners.two.sub.five")}</p>
                            <p>{t("treners.two.sub.six")}</p>
                            <p>{t("treners.two.sub.seven")}</p>
                        </div>
                    </div>
                </div>
                <div className={classes.dopInfo} data-aos="fade-left" data-aos-duration="1300">
                    <p>{t("treners.two.dop.one")}</p>
                    <ul>
                        <li>{t("treners.two.dop.two")}</li>
                        <li>{t("treners.two.dop.three")}</li>
                        <li>{t("treners.two.dop.four")}</li>
                        <li>{t("treners.two.dop.five")}</li>
                    </ul>
                    <span></span>
                </div> */}
                
            </div>
            <div className={classes.buttons} data-aos="fade-down" data-aos-duration="1300" id="signup" ref={signupRef}>
                <Buttons setIsOpenRegister={setIsOpenRegister}/>
            </div>
            {/* PAYMENT */}
            <div className={classes.payment}>
                <span data-aos="fade" data-aos-duration="1300">{t("payment")}</span>
                <p data-aos="fade-up" data-aos-duration="1300" data-aos-delay="400">750 грн / 29 $</p>
                <hr/>
            </div>
            {/* FOOTER */}
            <footer className={classes.footer}>
                <div className={classes.links}>
                    <h5>{t("social")}</h5>
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
                    <h5>{t("publications.title")}</h5>
                    <a target="_blank" href="https://www.profispace.media/2021/08/28/pravila-udachnogo-shoppinga/">{t("publications.zero")}</a>
                    <a target="_blank" href="https://www.profispace.media/ru/2020/12/25/idei-stilnh-podarkov">{t("publications.one")} <br/>{t("publications.one1")}</a>
                    {/* <a target="_blank" href="https://www.profispace.media/ru/2020/11/07/na-stile-12-glavnh-modnh-trendov-osen-zima-2020-2021">{t("publications.two")} <br/> {t("publications.two1")}</a> */}
                    <a target="_blank" href="https://www.profispace.media/ru/2020/10/02/kak-sozdat-jenskii-osennii-ofisni-garderob-sovet-imidj-dizainera/?fbclid=IwAR2GYm-pZCrRGgAvw2VFsthtkXifwJlYqEBMqtr_2S2fJnFIh_zRrT4FlfU">{t("publications.three")}<br/>{t("publications.three1")}</a>
                    <a target="_blank" href="http://www.profi-fashion.com/geometriya-vneshnosti-ili-kak-rabotaet-teoriya-kibbi-na-praktike">{t("publications.four")}</a>
                    <a target="_blank" href="http://www.profi-fashion.com/business-style">{t("publications.five")}</a>
                </div>
            </footer>
        </div>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    isRegistered: state.common.isRegistered
});

export default connect(mapStateToProps, {
    setIsRegistered
})(Main);