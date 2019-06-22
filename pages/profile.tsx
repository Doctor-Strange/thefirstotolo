import React, { useState, useEffect } from 'react';
import { Section } from '../src/components/row/Sections';
import Layout from '../src/components/Layout';
import SetCarTimingForm from '../src/components/Forms/SetCarTimingForm';
import { Box, Flex } from '@rebass/grid';
import { Icon, Segment, Button, Popup } from 'semantic-ui-react';
import Router from 'next/router';
import { PriceCard, UserCard, CarCard, CarCardPlaceholder } from '../src/components/Cards'
import { Details, CarNav } from '../src/components/Car'
import { ShareBar } from '../src/components/ShareBar';
import { Formik, FormikActions, withFormik } from 'formik';
import { i18n, withTranslation } from '../src/i18n';
import { REQUEST_getUserCars, REQUEST_getUser } from '../src/API';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../src/lib/numbers';
import { ResultsCards } from '../src/components/Search';
import jsCookie from 'js-cookie';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' });

interface IProfile {
    t: any;
    id: number;
    first_name?: string;
    last_name?: string;
    image_url?: string;
    username?: string;
}

const Profile: React.SFC<IProfile> = ({ t, id, first_name, last_name, image_url, username }) => {
    const [results, setRresults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [own, setOwnership] = useState(false);

    async function fetchAPI() {
        // get cas and genrate a dropdown input in form
        const res = await REQUEST_getUserCars({ id });
        setRresults(res);
        setLoading(false);
    }

    useEffect(() => {
        fetchAPI();
        console.warn("user id is: ", jsCookie.get('user_id'));
        if (jsCookie.get('user_id') == id) {
            setOwnership(true);
        }
    }, []);

    return (
        <Layout haveSubHeader={true} pageTitle={'list Your Car'}>
            {/* {isMobile &&
                <CarNav startDate={start_date} endDate={end_date} />
            } */}
            <Section justifyCenter={true} style={{ marginTop: '24px' }} rowClassName="profile_page">
                <ResultsCards
                    t={t}
                    results={results}
                    loadingResults={loading}
                    lodingMore={false}
                    noResult={false}
                    showMore={false}
                    dateURL={null}
                    colClass="col-lg-8"
                    marginClass=""
                    showInProfile={true}
                    userOwnPage={own ? true : false}
                />
                <aside className="col-lg-4" id="sidebar">
                    <div className="box_detail booking">
                        <div
                            className="score"
                        >
                        <UserCard
                            id={22}
                            firstname={first_name}
                            lastname={last_name}
                            username={username}
                            responceTime="میانگین زمان پاسخگویی: نامشخص"
                            image={image_url}
                            own={own}
                            onUpdate={() => {
                                Router.push({pathname: Router.pathname, query:Router.query})
                            }}
                        />
                        </div>
                        {/* <div
                                style={{ marginTop: '8px' }}
                                className="text-center"
                            >
                            </div> */}
                    </div>
                <ShareBar />
                </aside>
            </Section>
            {/* {(isMobile && own) &&
                <Button
                    style={{
                        zIndex: '55',
                        bottom: '0',
                        position: 'fixed',
                        borderRadius: '0',
                        margin: '0',
                        height: '56px'
                    }}
                    primary
                    type="submit"
                    className="btn_1 full-width"
                >
                    ویرایش پروفایل
            </Button> */}
}
        </Layout >
    );
}

Profile.getInitialProps = async (props) => {
    if (typeof window === 'undefined') {
        console.log('Server Side Router Query', props.query);
    } else {
        console.log('Client side Router Query', props.query);
    }
    const res = await REQUEST_getUser({
        id: props.query.id
    })
    return {
        namespacesRequired: ['common'],
        profileID: props.query.id,
        ...res
    };
}

export default withTranslation('common')(Profile);



