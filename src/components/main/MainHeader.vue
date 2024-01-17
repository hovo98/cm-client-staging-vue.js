<template>
  <div>
    <header
      v-if="$route.name !== '404'"
      id="masthead"
      ref="header"
      :class="['site-header', loggedIn ? 'site-header--dashboard' : '']"
    >
      <transition name="fade-in-right">
        <div
          id="globalMsg"
          class="notification-wrap"
        />
      </transition>
      <template v-if="loggedIn && $route.name !== 'Sign Up'">
        <div class="site-header__dashboard-container container-wide">
          <div class="site-header__dashboard">
            <div
              v-if="!non_beta_user"
              class="site-header__invite explanation-video"
            >
              <a
                href="javascript:;"
                class="btn btn--alt btn--small"
                @click.stop="ExplanationVideo()"
              >
                <SvgIcon
                  class="btn__icon"
                  icon-name="ico-play"
                />
                Watch Tutorial
              </a>
            </div>
            <div class="site-header__invite">
              <a
                href="javascript:;"
                class="btn btn--small"
                @click.stop="openPopup"
              >
                <SvgIcon
                  class="btn__icon"
                  icon-name="ico-plus"
                />
                Invite
              </a>
            </div>
            <div
              v-if="user.role === 'broker' && subscription?.status === 'trialing' "
              class="site-header__invite"
            >
              <a
                href="https://financelobby.com/brokers/pricing/"
                target="_blank"
                class="btn btn--small"
              >
              
                Free trial ends in: {{ daysRemaining }}
              </a>
            </div>
            <!-- <div class="site-header__notification">
                      <div class="site-header__notification-top">
                        <SvgIcon class="site-header__notification-icon" iconName="ico-bell" />
                        <span class="site-header__notification-num" v-if="notificationNum">{{notificationNum}}</span>
                      </div>
                      <div class="site-header__notification-bottom">
                        <ul class="site-header__notification-list">
                          <li class="site-header__notification-list-item">
                            <div class="site-header__notification-list-img" :style="{backgroundImage: 'url(' + (notificationImage ? notificationImage : placeholderImage) + ')'}"></div>
                            <div class="site-header__notification-list-details">
                              <h4 class="site-header__notification-list-title"><span class="site-header__notification-list-title-name">Sam Smith</span> set his <router-link class="site-header__notification-list-title-status" to="/status">status</router-link>.</h4>
                              <span class="site-header__notification-list-time">July 8, 2020 - 10:12 AM</span>
                            </div>
                            <a href="javascript:;" class="site-header__notification-list-remove"><SvgIcon class="site-header__notification-list-icon" iconName="ico-close-thin" /></a>
                          </li>
                          <li class="site-header__notification-list-item">
                            <div class="site-header__notification-list-img" :style="{backgroundImage: 'url(' + (notificationImage ? notificationImage : placeholderImage) + ')'}"></div>
                            <div class="site-header__notification-list-details">
                              <h4 class="site-header__notification-list-title"><span class="site-header__notification-list-title-name">Sam Smith</span> changed his <router-link class="site-header__notification-list-title-status" to="/status">status</router-link>.</h4>
                              <span class="site-header__notification-list-time">July 8, 2020 - 10:12 AM</span>
                            </div>
                            <a href="javascript:;" class="site-header__notification-list-remove"><SvgIcon class="site-header__notification-list-icon" iconName="ico-close-thin" /></a>
                          </li>
                          <li class="site-header__notification-list-item">
                            <div class="site-header__notification-list-img" :style="{backgroundImage: 'url(' + (notificationImage ? notificationImage : placeholderImage) + ')'}"></div>
                            <div class="site-header__notification-list-details">
                              <h4 class="site-header__notification-list-title"><span class="site-header__notification-list-title-name">Sam Smith</span> set his <router-link class="site-header__notification-list-title-status" to="/status">status</router-link>.</h4>
                              <span class="site-header__notification-list-time">July 8, 2020 - 10:12 AM</span>
                            </div>
                            <a href="javascript:;" class="site-header__notification-list-remove"><SvgIcon class="site-header__notification-list-icon" iconName="ico-close-thin" /></a>
                          </li>
                          <li class="site-header__notification-list-item">
                            <div class="site-header__notification-list-img" :style="{backgroundImage: 'url(' + (notificationImage ? notificationImage : placeholderImage) + ')'}"></div>
                            <div class="site-header__notification-list-details">
                              <h4 class="site-header__notification-list-title"><span class="site-header__notification-list-title-name">Sam Smith</span> changed his <router-link class="site-header__notification-list-title-status" to="/status">status</router-link>.</h4>
                              <span class="site-header__notification-list-time">July 8, 2020 - 10:12 AM</span>
                            </div>
                            <a href="javascript:;" class="site-header__notification-list-remove"><SvgIcon class="site-header__notification-list-icon" iconName="ico-close-thin" /></a>
                          </li>
                          <li class="site-header__notification-list-item">
                            <div class="site-header__notification-list-img" :style="{backgroundImage: 'url(' + (notificationImage ? notificationImage : placeholderImage) + ')'}"></div>
                            <div class="site-header__notification-list-details">
                              <h4 class="site-header__notification-list-title"><span class="site-header__notification-list-title-name">Sam Smith</span> set his <router-link class="site-header__notification-list-title-status" to="/status">status</router-link>.</h4>
                              <span class="site-header__notification-list-time">July 8, 2020 - 10:12 AM</span>
                            </div>
                            <a href="javascript:;" class="site-header__notification-list-remove"><SvgIcon class="site-header__notification-list-icon" iconName="ico-close-thin" /></a>
                          </li>
                        </ul>
                        <div class="site-header__notification-button-holder">
                          <router-link to="/notifications" class="btn-inline">View All</router-link>
                        </div>
                      </div>
                    </div> -->
            <div
              v-click-outside="hide"
              :class="['site-header__profile', active ? 'opened' : null]"
            >
              <div
                class="site-header__profile-top"
                @click="active = !active"
              >
                <div
                  class="site-header__profile-img"
                  :style="{ backgroundImage: 'url(' + (image ? image : placeholderImage) + ')' }"
                  @click="goTo()"
                />
                <div class="site-header__profile-wrapper">
                  <h4 class="site-header__profile-title">
                    Welcome, {{ user.first_name }}!
                    <SvgIcon
                      class="site-header__profile-icon"
                      icon-name="ico-chevron-down"
                    />
                  </h4>
                  <span v-if="user.role === 'broker' && (subscription?.status === 'active' || subscription?.status === 'trialing') ">
                    {{ subscriptionName }}
                  </span>
                  <span
                    v-else-if="user.role === 'broker' && !subscription?.status"
                    class="subscription__free-tier"
                  >Free tier</span>
                </div>
              </div>
              <ul class="site-header__profile-menu">
                <!--							<li class="site-header__profile-menu-item"><router-link class="site-header__profile-menu-link" to="/profile-settings"><SvgIcon class="site-header__profile-menu-icon" iconName="ico-user-solid" />Profile Settings</router-link></li>-->
                <li
                  class="site-header__profile-menu-item"
                  @click="active = !active"
                >
                  <router-link
                    class="site-header__profile-menu-link"
                    to="/profile-settings"
                  >
                    <SvgIcon
                      class="site-header__profile-menu-icon"
                      icon-name="ico-user-solid"
                    />
                    Profile Settings
                  </router-link>
                </li>
                <li
                  class="site-header__profile-menu-item"
                  @click="logout()"
                >
                  <a
                    class="site-header__profile-menu-link"
                    href="javascript:;"
                  >
                    <SvgIcon
                      class="site-header__profile-menu-icon"
                      icon-name="ico-sign-out"
                    />
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul class="site-header__profile-menu">
          <!--							<li class="site-header__profile-menu-item"><router-link class="site-header__profile-menu-link" to="/profile-settings"><SvgIcon class="site-header__profile-menu-icon" iconName="ico-user-solid" />Profile Settings</router-link></li>-->
          <li
            class="site-header__profile-menu-item"
            @click="active = !active"
          >
            <router-link
              class="site-header__profile-menu-link"
              to="/profile-settings"
            >
              <SvgIcon
                class="site-header__profile-menu-icon"
                icon-name="ico-user-solid"
              />
              Profile Settings
            </router-link>
          </li>
          <li
            class="site-header__profile-menu-item"
            @click="logout()"
          >
            <a
              class="site-header__profile-menu-link"
              href="javascript:;"
            >
              <SvgIcon
                class="site-header__profile-menu-icon"
                icon-name="ico-sign-out"
              />
              Log out
            </a>
          </li>
        </ul>
      </template>
      <div
        v-else
        class="site-header__base-container container-wide"
      >
        <div
          v-if="!logoChange()"
          class="site-header__base-branding"
        >
          <router-link
            class="site-header__base-logo"
            to="/"
          >
            <template
              alt="Logo"
              title="Logo"
              @click="clearToken"
            >
              <svg
                id="Layer_1"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 1200 250"
                style="enable-background:new 0 0 1200 250;"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <polygon
                      class="st0"
                      points="183,79 211.5,95.1 211.8,154.1 132.2,109.2 		"
                    />
                    <polygon
                      class="st1"
                      points="361.3,149.7 210,64.2 210,4.8 412,119.7 		"
                    />
                    <polygon
                      class="st0"
                      points="50.8,156.6 210,64.2 210,4.8 0,126.4 		"
                    />
                    <polygon
                      class="st2"
                      points="131,141 199.6,179.7 199.6,238.5 80.3,171 		"
                    />
                    <polygon
                      class="st3"
                      points="342,169.3 290.6,139.7 211,185.9 133.9,142.5 133.9,201.3 200.3,238.8 211.2,245.2 		"
                    />
                    <polygon
                      class="st1"
                      points="212.5,154.4 184.4,138.5 183.7,79.3 263.2,124.4 		"
                    />
                  </g>
                  <g>
                    <g>
                      <path
                        class="st1"
                        d="M462.5,127.2V40.6H515v11.2h-40.7v27.8h36.8v11.2h-36.8v36.4H462.5z"
                      />
                      <path
                        class="st1"
                        d="M530.4,37.9c4.6,0,8.3,3.7,8.3,8.3c0,4.6-3.7,8.1-8.3,8.1c-4.6,0-8.1-3.7-8.1-8.1
                                        C522.3,41.6,525.9,37.9,530.4,37.9z M524.8,127.2V68.6h11.4v58.6H524.8z"
                      />
                      <path
                        class="st1"
                        d="M564.2,127.2h-11.5V68.6h11.2V77c4.2-7.3,11.2-10.2,18.1-10.2c14.1,0,21,10.2,21,23.2v37.3h-11.5V92.1
                                        c0-8.1-3.4-14.7-13.7-14.7c-9,0-13.7,7.1-13.7,16.1v33.7H564.2z"
                      />
                      <path
                        class="st1"
                        d="M632.3,93.7l15.9-2.4c3.6-0.5,4.6-2.4,4.6-4.4c0-5.8-3.7-10.5-12.7-10.5c-8.1,0-12.5,5.1-13.2,11.9l-11-2.5
                                        c1.2-11.2,11.4-19,24.1-19c17.6,0,24.4,10,24.4,21.5v29.5c0,5.1,0.5,8.1,0.7,9.7h-11.2c-0.2-1.5-0.7-3.7-0.7-8
                                        c-2.5,4.1-8.5,9.8-19,9.8c-12,0-19.7-8.3-19.7-17.6C614.5,100.9,622.1,95,632.3,93.7z M652.6,102v-2.7l-18,2.7
                                        c-4.9,0.7-8.5,3.6-8.5,8.8c0,4.4,3.7,8.5,9.5,8.5C645.2,119.4,652.6,114.8,652.6,102z"
                      />
                      <path
                        class="st1"
                        d="M690.4,127.2h-11.5V68.6h11.2V77c4.2-7.3,11.2-10.2,18.1-10.2c14.1,0,21,10.2,21,23.2v37.3h-11.5V92.1
                                        c0-8.1-3.4-14.7-13.7-14.7c-9,0-13.7,7.1-13.7,16.1v33.7H690.4z"
                      />
                      <path
                        class="st1"
                        d="M751.2,97.7c0,13.4,8.5,20.7,18,20.7c11,0,15.1-7.5,16.3-12l10.2,4.4c-2.9,8.5-11.2,18.3-26.4,18.3
                                        c-17.1,0-29.7-13.4-29.7-31.2c0-18.3,12.9-31.2,29.5-31.2c15.6,0,23.7,9.8,26.1,18.6l-10.3,4.4C783.3,84,779,77.4,769,77.4
                                        C759.9,77.2,751.2,84.2,751.2,97.7z"
                      />
                      <path
                        class="st1"
                        d="M856.7,110.4c-3.2,10.3-12.7,18.5-26.4,18.5c-15.8,0-29.5-11.5-29.5-31.4c0-18.5,13.2-31,28.1-31
                                        c18.1,0,28.1,12.4,28.1,30.7c0,1.5-0.2,2.9-0.2,3.7h-44.2c0.2,10.5,7.8,17.8,17.6,17.8c9.5,0,14.2-5.3,16.4-11.9L856.7,110.4z
                                        M845,91.8c-0.2-8.5-5.8-15.1-16.1-15.1c-9.7,0-15.4,7.5-15.9,15.1H845z"
                      />
                      <path
                        class="st3"
                        d="M868.7,127.2V40.6h16.8v70.3h38.6V127h-55.4V127.2z"
                      />
                      <path
                        class="st3"
                        d="M991.2,97.2c0,18.5-13.6,31.9-31.5,31.9c-18,0-31.5-13.4-31.5-31.9s13.6-31.9,31.5-31.9
                                        C977.7,65.4,991.2,78.6,991.2,97.2z M975.1,97.2c0-11.4-7.3-17.1-15.3-17.1c-8,0-15.3,5.8-15.3,17.1c0,11.2,7.3,17.1,15.3,17.1
                                        C967.8,114.3,975.1,108.6,975.1,97.2z"
                      />
                      <path
                        class="st3"
                        d="M1001,127.2V38.7h15.9v34.9c2.7-4.2,9.3-8.1,18.1-8.1c17.6,0,27.6,13.6,27.6,31.4
                                        c0,18.1-11.2,31.7-28.3,31.7c-8.3,0-14.6-3.7-17.8-8.8v7.3H1001V127.2z M1031.7,80.1c-8.1,0-15.1,5.9-15.1,16.9
                                        c0,10.8,6.8,17.1,15.1,17.1s14.9-6.1,14.9-17.1S1040,80.1,1031.7,80.1z"
                      />
                      <path
                        class="st3"
                        d="M1072.7,127.2V38.7h15.9v34.9c2.7-4.2,9.3-8.1,18.1-8.1c17.6,0,27.6,13.6,27.6,31.4
                                        c0,18.1-11.2,31.7-28.3,31.7c-8.3,0-14.6-3.7-17.8-8.8v7.3h-15.6V127.2z M1103.4,80.1c-8.1,0-15.1,5.9-15.1,16.9
                                        c0,10.8,6.8,17.1,15.1,17.1s14.9-6.1,14.9-17.1S1111.7,80.1,1103.4,80.1z"
                      />
                      <path
                        class="st3"
                        d="M1145.1,150.8l14.2-31.2L1133.9,67h18.1l15.9,35.1l14.7-35.1h17.3l-37.6,83.7H1145.1z"
                      />
                    </g>
                    <g>
                      <path
                        class="st0"
                        d="M475.9,201.7h-3.6v-27.8h-9.8v-3.2h23.2v3.2h-9.8V201.7z"
                      />
                      <path
                        class="st0"
                        d="M510,201.7v-15c0-1.9-0.4-3.3-1.3-4.2c-0.9-0.9-2.2-1.4-4-1.4c-2.4,0-4.2,0.7-5.3,2
                                        c-1.1,1.3-1.7,3.5-1.7,6.5v12.1h-3.5v-32.9h3.5v10c0,1.2-0.1,2.2-0.2,3h0.2c0.7-1.1,1.7-2,3-2.6c1.3-0.6,2.7-1,4.4-1
                                        c2.8,0,5,0.7,6.4,2c1.4,1.3,2.1,3.5,2.1,6.4v15.1H510z"
                      />
                      <path
                        class="st0"
                        d="M534.9,202.1c-3.4,0-6.1-1-8.1-3.1c-2-2.1-3-5-3-8.7c0-3.7,0.9-6.7,2.8-8.9c1.8-2.2,4.3-3.3,7.4-3.3
                                        c2.9,0,5.2,1,6.9,2.9s2.5,4.4,2.5,7.6v2.2h-16c0.1,2.7,0.8,4.8,2.1,6.2c1.3,1.4,3.1,2.1,5.5,2.1c2.5,0,5-0.5,7.4-1.6v3.1
                                        c-1.2,0.5-2.4,0.9-3.5,1.2C537.8,202,536.5,202.1,534.9,202.1z M533.9,181c-1.9,0-3.3,0.6-4.5,1.8c-1.1,1.2-1.8,2.9-2,5h12.1
                                        c0-2.2-0.5-3.9-1.5-5.1C537.2,181.6,535.8,181,533.9,181z"
                      />
                      <path
                        class="st0"
                        d="M583.1,173.5c-3.4,0-6.1,1.1-8.1,3.4c-2,2.3-3,5.4-3,9.3c0,4.1,0.9,7.2,2.8,9.4c1.9,2.2,4.6,3.3,8.1,3.3
                                        c2.2,0,4.6-0.4,7.4-1.2v3.2c-2.1,0.8-4.8,1.2-7.9,1.2c-4.6,0-8.1-1.4-10.6-4.1c-2.5-2.8-3.7-6.7-3.7-11.8c0-3.2,0.6-6,1.8-8.4
                                        c1.2-2.4,2.9-4.2,5.2-5.5c2.3-1.3,4.9-1.9,7.9-1.9c3.2,0,6.1,0.6,8.5,1.8l-1.5,3.1C587.8,174.1,585.5,173.5,583.1,173.5z"
                      />
                      <path
                        class="st0"
                        d="M605.2,188.8v12.9h-3.6v-31h8.5c3.8,0,6.6,0.7,8.4,2.2c1.8,1.5,2.7,3.6,2.7,6.6c0,4.1-2.1,6.9-6.2,8.3
                                        l8.4,13.9h-4.3l-7.5-12.9H605.2z M605.2,185.7h4.9c2.5,0,4.4-0.5,5.6-1.5c1.2-1,1.8-2.5,1.8-4.5c0-2-0.6-3.5-1.8-4.4
                                        c-1.2-0.9-3.1-1.4-5.8-1.4h-4.7V185.7z"
                      />
                      <path
                        class="st0"
                        d="M650,201.7h-17.3v-31H650v3.2h-13.7v10h12.8v3.2h-12.8v11.4H650V201.7z"
                      />
                      <path
                        class="st0"
                        d="M686.7,181.2h-5.9v20.5h-3.5v-20.5h-4.1v-1.6l4.1-1.3v-1.3c0-5.7,2.5-8.6,7.5-8.6c1.2,0,2.7,0.2,4.3,0.7
                                        l-0.9,2.8c-1.4-0.4-2.5-0.7-3.5-0.7c-1.3,0-2.3,0.4-2.9,1.3c-0.6,0.9-1,2.3-1,4.2v1.5h5.9V181.2z M690.6,172.2
                                        c0-0.8,0.2-1.4,0.6-1.8c0.4-0.4,0.9-0.6,1.5-0.6c0.6,0,1.1,0.2,1.5,0.6c0.4,0.4,0.6,1,0.6,1.8c0,0.8-0.2,1.4-0.6,1.8
                                        c-0.4,0.4-0.9,0.6-1.5,0.6c-0.6,0-1.1-0.2-1.5-0.6C690.8,173.6,690.6,173,690.6,172.2z M694.4,201.7h-3.5v-23.2h3.5V201.7z"
                      />
                      <path
                        class="st0"
                        d="M722.1,201.7v-15c0-1.9-0.4-3.3-1.3-4.2c-0.9-0.9-2.2-1.4-4-1.4c-2.4,0-4.2,0.7-5.3,2
                                        c-1.1,1.3-1.7,3.5-1.7,6.5v12.2h-3.5v-23.2h2.9l0.6,3.2h0.2c0.7-1.1,1.7-2,3-2.7c1.3-0.6,2.7-0.9,4.3-0.9c2.8,0,4.9,0.7,6.3,2
                                        c1.4,1.3,2.1,3.5,2.1,6.5v15.1H722.1z"
                      />
                      <path
                        class="st0"
                        d="M751.4,201.7l-0.7-3.3h-0.2c-1.2,1.5-2.3,2.4-3.5,3c-1.2,0.5-2.6,0.8-4.3,0.8c-2.3,0-4.1-0.6-5.4-1.8
                                        s-2-2.9-2-5.1c0-4.7,3.7-7.1,11.2-7.4l3.9-0.1v-1.4c0-1.8-0.4-3.2-1.2-4c-0.8-0.9-2-1.3-3.8-1.3c-1.9,0-4.1,0.6-6.6,1.8l-1.1-2.7
                                        c1.1-0.6,2.4-1.1,3.8-1.5c1.4-0.4,2.7-0.5,4.1-0.5c2.8,0,4.8,0.6,6.2,1.8c1.3,1.2,2,3.2,2,5.9v15.8H751.4z M743.5,199.2
                                        c2.2,0,3.9-0.6,5.2-1.8c1.2-1.2,1.9-2.9,1.9-5v-2.1l-3.5,0.1c-2.8,0.1-4.8,0.5-6,1.3c-1.2,0.8-1.9,2-1.9,3.6
                                        c0,1.3,0.4,2.2,1.2,2.9C741,198.9,742.1,199.2,743.5,199.2z"
                      />
                      <path
                        class="st0"
                        d="M781.5,201.7v-15c0-1.9-0.4-3.3-1.3-4.2c-0.9-0.9-2.2-1.4-4-1.4c-2.4,0-4.2,0.7-5.3,2
                                        c-1.1,1.3-1.7,3.5-1.7,6.5v12.2h-3.5v-23.2h2.9l0.6,3.2h0.2c0.7-1.1,1.7-2,3-2.7c1.3-0.6,2.7-0.9,4.3-0.9c2.8,0,4.9,0.7,6.3,2
                                        c1.4,1.3,2.1,3.5,2.1,6.5v15.1H781.5z"
                      />
                      <path
                        class="st0"
                        d="M805.8,202.1c-3.4,0-6-1-7.8-3.1c-1.8-2.1-2.8-5-2.8-8.8c0-3.9,0.9-6.9,2.8-9c1.9-2.1,4.5-3.2,8-3.2
                                        c1.1,0,2.2,0.1,3.3,0.4c1.1,0.2,2,0.5,2.6,0.8l-1.1,3c-0.8-0.3-1.6-0.6-2.5-0.8c-0.9-0.2-1.7-0.3-2.4-0.3c-4.7,0-7.1,3-7.1,9
                                        c0,2.9,0.6,5,1.7,6.6c1.2,1.5,2.9,2.3,5.1,2.3c1.9,0,3.9-0.4,5.9-1.3v3.1C810.2,201.7,808.2,202.1,805.8,202.1z"
                      />
                      <path
                        class="st0"
                        d="M821.2,172.2c0-0.8,0.2-1.4,0.6-1.8c0.4-0.4,0.9-0.6,1.5-0.6c0.6,0,1,0.2,1.5,0.6c0.4,0.4,0.6,1,0.6,1.8
                                        c0,0.8-0.2,1.4-0.6,1.8c-0.4,0.4-0.9,0.6-1.5,0.6c-0.6,0-1.1-0.2-1.5-0.6C821.4,173.6,821.2,173,821.2,172.2z M825.1,201.7h-3.5
                                        v-23.2h3.5V201.7z"
                      />
                      <path
                        class="st0"
                        d="M852.7,201.7v-15c0-1.9-0.4-3.3-1.3-4.2c-0.9-0.9-2.2-1.4-4-1.4c-2.4,0-4.2,0.7-5.3,2
                                        c-1.1,1.3-1.7,3.5-1.7,6.5v12.2h-3.5v-23.2h2.9l0.6,3.2h0.2c0.7-1.1,1.7-2,3-2.7c1.3-0.6,2.7-0.9,4.3-0.9c2.8,0,4.9,0.7,6.3,2
                                        c1.4,1.3,2.1,3.5,2.1,6.5v15.1H852.7z"
                      />
                      <path
                        class="st0"
                        d="M886.8,178.5v2.2l-4.3,0.5c0.4,0.5,0.7,1.1,1.1,1.9c0.3,0.8,0.5,1.7,0.5,2.7c0,2.3-0.8,4.1-2.3,5.4
                                        c-1.6,1.4-3.7,2-6.4,2c-0.7,0-1.3-0.1-1.9-0.2c-1.5,0.8-2.2,1.8-2.2,3c0,0.6,0.3,1.1,0.8,1.4c0.5,0.3,1.4,0.5,2.7,0.5h4.1
                                        c2.5,0,4.4,0.5,5.8,1.6c1.3,1.1,2,2.6,2,4.6c0,2.6-1,4.5-3.1,5.9c-2.1,1.3-5.1,2-9,2c-3,0-5.4-0.6-7-1.7s-2.5-2.7-2.5-4.8
                                        c0-1.4,0.5-2.6,1.4-3.7c0.9-1,2.2-1.7,3.8-2.1c-0.6-0.3-1.1-0.7-1.5-1.2c-0.4-0.6-0.6-1.2-0.6-2c0-0.8,0.2-1.6,0.7-2.2
                                        c0.5-0.6,1.2-1.3,2.1-1.8c-1.2-0.5-2.2-1.3-2.9-2.5c-0.8-1.2-1.1-2.5-1.1-4.1c0-2.5,0.8-4.5,2.3-5.9c1.5-1.4,3.7-2.1,6.5-2.1
                                        c1.2,0,2.3,0.1,3.3,0.4H886.8z M868.3,205.6c0,1.3,0.5,2.2,1.6,2.9s2.6,1,4.6,1c2.9,0,5.1-0.4,6.6-1.3c1.4-0.9,2.1-2.1,2.1-3.6
                                        c0-1.3-0.4-2.1-1.2-2.6c-0.8-0.5-2.2-0.7-4.4-0.7h-4.2c-1.6,0-2.8,0.4-3.7,1.1C868.7,203.1,868.3,204.2,868.3,205.6z
                                        M870.2,185.9c0,1.6,0.5,2.9,1.4,3.7c0.9,0.8,2.2,1.3,3.8,1.3c3.4,0,5.1-1.7,5.1-5c0-3.5-1.7-5.2-5.2-5.2c-1.7,0-2.9,0.4-3.8,1.3
                                        C870.6,182.8,870.2,184.2,870.2,185.9z"
                      />
                      <path
                        class="st0"
                        d="M941.1,201.7v-15.1c0-1.8-0.4-3.2-1.2-4.2c-0.8-0.9-2-1.4-3.7-1.4c-2.2,0-3.8,0.6-4.8,1.9
                                        c-1,1.3-1.6,3.2-1.6,5.8v13h-3.5v-15.1c0-1.8-0.4-3.2-1.2-4.2c-0.8-0.9-2-1.4-3.7-1.4c-2.2,0-3.8,0.7-4.8,2
                                        c-1,1.3-1.5,3.5-1.5,6.5v12.2h-3.5v-23.2h2.9l0.6,3.2h0.2c0.7-1.1,1.6-2,2.8-2.6s2.6-1,4.1-1c3.6,0,6,1.3,7.1,3.9h0.2
                                        c0.7-1.2,1.7-2.2,3-2.9c1.3-0.7,2.8-1.1,4.5-1.1c2.6,0,4.6,0.7,5.9,2c1.3,1.3,2,3.5,2,6.5v15.1H941.1z"
                      />
                      <path
                        class="st0"
                        d="M970.4,201.7l-0.7-3.3h-0.2c-1.2,1.5-2.3,2.4-3.5,3c-1.2,0.5-2.6,0.8-4.3,0.8c-2.3,0-4.1-0.6-5.4-1.8
                                        s-2-2.9-2-5.1c0-4.7,3.7-7.1,11.2-7.4l3.9-0.1v-1.4c0-1.8-0.4-3.2-1.2-4c-0.8-0.9-2-1.3-3.8-1.3c-1.9,0-4.1,0.6-6.6,1.8l-1.1-2.7
                                        c1.1-0.6,2.4-1.1,3.8-1.5c1.4-0.4,2.7-0.5,4.1-0.5c2.8,0,4.8,0.6,6.2,1.8c1.3,1.2,2,3.2,2,5.9v15.8H970.4z M962.5,199.2
                                        c2.2,0,3.9-0.6,5.2-1.8c1.2-1.2,1.9-2.9,1.9-5v-2.1l-3.5,0.1c-2.8,0.1-4.8,0.5-6,1.3c-1.2,0.8-1.9,2-1.9,3.6
                                        c0,1.3,0.4,2.2,1.2,2.9C960,198.9,961.1,199.2,962.5,199.2z"
                      />
                      <path
                        class="st0"
                        d="M995.2,178.1c1,0,2,0.1,2.8,0.3l-0.5,3.3c-1-0.2-1.8-0.3-2.5-0.3c-1.9,0-3.5,0.8-4.8,2.3
                                        c-1.3,1.5-2,3.4-2,5.7v12.4h-3.5v-23.2h2.9l0.4,4.3h0.2c0.9-1.5,1.9-2.7,3.1-3.5C992.4,178.5,993.7,178.1,995.2,178.1z"
                      />
                      <path
                        class="st0"
                        d="M1010.1,189.8c0.6-0.9,1.5-2,2.8-3.4l7.5-7.9h4.2l-9.4,9.9l10.1,13.3h-4.3l-8.2-11l-2.6,2.3v8.7h-3.5v-32.9
                                        h3.5v17.5c0,0.8-0.1,2-0.2,3.6H1010.1z"
                      />
                      <path
                        class="st0"
                        d="M1043.5,202.1c-3.4,0-6.1-1-8.1-3.1c-2-2.1-3-5-3-8.7c0-3.7,0.9-6.7,2.8-8.9c1.8-2.2,4.3-3.3,7.4-3.3
                                        c2.9,0,5.2,1,6.9,2.9c1.7,1.9,2.5,4.4,2.5,7.6v2.2h-16c0.1,2.7,0.8,4.8,2.1,6.2c1.3,1.4,3.1,2.1,5.5,2.1c2.5,0,5-0.5,7.4-1.6v3.1
                                        c-1.2,0.5-2.4,0.9-3.5,1.2C1046.4,202,1045.1,202.1,1043.5,202.1z M1042.6,181c-1.9,0-3.3,0.6-4.5,1.8c-1.1,1.2-1.8,2.9-2,5h12.1
                                        c0-2.2-0.5-3.9-1.5-5.1C1045.8,181.6,1044.4,181,1042.6,181z"
                      />
                      <path
                        class="st0"
                        d="M1069.9,199.2c0.6,0,1.2,0,1.8-0.1c0.6-0.1,1-0.2,1.4-0.3v2.7c-0.4,0.2-0.9,0.3-1.7,0.5
                                        c-0.7,0.1-1.4,0.2-2,0.2c-4.5,0-6.7-2.4-6.7-7.1v-13.8h-3.3v-1.7l3.3-1.5l1.5-5h2v5.4h6.7v2.7h-6.7v13.7c0,1.4,0.3,2.5,1,3.2
                                        C1067.8,198.8,1068.7,199.2,1069.9,199.2z"
                      />
                      <path
                        class="st0"
                        d="M1092.8,202.1c-1.5,0-2.9-0.3-4.1-0.8c-1.3-0.6-2.3-1.4-3.1-2.6h-0.3c0.2,1.4,0.3,2.6,0.3,3.9v9.5h-3.5
                                        v-33.6h2.9l0.5,3.2h0.2c0.9-1.3,2-2.2,3.2-2.8c1.2-0.6,2.6-0.8,4.1-0.8c3.1,0,5.5,1.1,7.1,3.2c1.7,2.1,2.5,5.1,2.5,8.9
                                        c0,3.8-0.8,6.8-2.6,8.9C1098.2,201.1,1095.8,202.1,1092.8,202.1z M1092.3,181c-2.4,0-4.1,0.7-5.1,2c-1.1,1.3-1.6,3.4-1.6,6.3v0.8
                                        c0,3.3,0.5,5.6,1.6,7c1.1,1.4,2.8,2.1,5.2,2.1c2,0,3.6-0.8,4.7-2.4c1.1-1.6,1.7-3.9,1.7-6.7c0-2.9-0.6-5.1-1.7-6.7
                                        C1096,181.8,1094.4,181,1092.3,181z"
                      />
                      <path
                        class="st0"
                        d="M1116.5,201.7h-3.5v-32.9h3.5V201.7z"
                      />
                      <path
                        class="st0"
                        d="M1142.5,201.7l-0.7-3.3h-0.2c-1.2,1.5-2.3,2.4-3.5,3s-2.6,0.8-4.3,0.8c-2.3,0-4.1-0.6-5.4-1.8
                                        c-1.3-1.2-2-2.9-2-5.1c0-4.7,3.7-7.1,11.2-7.4l3.9-0.1v-1.4c0-1.8-0.4-3.2-1.2-4c-0.8-0.9-2-1.3-3.8-1.3c-1.9,0-4.1,0.6-6.6,1.8
                                        l-1.1-2.7c1.1-0.6,2.4-1.1,3.8-1.5c1.4-0.4,2.7-0.5,4.1-0.5c2.8,0,4.8,0.6,6.2,1.8c1.3,1.2,2,3.2,2,5.9v15.8H1142.5z
                                        M1134.6,199.2c2.2,0,3.9-0.6,5.2-1.8c1.2-1.2,1.9-2.9,1.9-5v-2.1l-3.5,0.1c-2.8,0.1-4.8,0.5-6,1.3c-1.2,0.8-1.9,2-1.9,3.6
                                        c0,1.3,0.4,2.2,1.2,2.9C1132.1,198.9,1133.2,199.2,1134.6,199.2z"
                      />
                      <path
                        class="st0"
                        d="M1166,202.1c-3.4,0-6-1-7.8-3.1c-1.8-2.1-2.8-5-2.8-8.8c0-3.9,0.9-6.9,2.8-9c1.9-2.1,4.5-3.2,8-3.2
                                        c1.1,0,2.2,0.1,3.3,0.4c1.1,0.2,2,0.5,2.6,0.8l-1.1,3c-0.8-0.3-1.6-0.6-2.5-0.8c-0.9-0.2-1.7-0.3-2.4-0.3c-4.7,0-7.1,3-7.1,9
                                        c0,2.9,0.6,5,1.7,6.6c1.2,1.5,2.9,2.3,5.1,2.3c1.9,0,3.9-0.4,5.9-1.3v3.1C1170.3,201.7,1168.3,202.1,1166,202.1z"
                      />
                      <path
                        class="st0"
                        d="M1191.5,202.1c-3.4,0-6.1-1-8.1-3.1c-2-2.1-3-5-3-8.7c0-3.7,0.9-6.7,2.8-8.9c1.8-2.2,4.3-3.3,7.4-3.3
                                        c2.9,0,5.2,1,6.9,2.9c1.7,1.9,2.5,4.4,2.5,7.6v2.2h-16c0.1,2.7,0.8,4.8,2.1,6.2c1.3,1.4,3.1,2.1,5.5,2.1c2.5,0,5-0.5,7.4-1.6v3.1
                                        c-1.2,0.5-2.4,0.9-3.5,1.2C1194.4,202,1193,202.1,1191.5,202.1z M1190.5,181c-1.9,0-3.3,0.6-4.5,1.8c-1.1,1.2-1.8,2.9-2,5h12.1
                                        c0-2.2-0.5-3.9-1.5-5.1C1193.8,181.6,1192.3,181,1190.5,181z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </template>
          </router-link>
        </div>

        <div
          v-else
          class="site-header__base-branding"
        >
          <router-link
            class="site-header__base-logo"
            to="/"
          >
            <template
              alt="Logo"
              title="Logo"
              @click="clearToken"
            >
              <svg
                id="Layer_1"
                class="site-header__base-logo-img beta"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 708 142"
                style="enable-background:new 0 0 708 142;"
                xml:space="preserve"
              >
                <g>
                  <polygon
                    class="st0"
                    points="107.9,43.8 124.7,53.3 124.9,88.2 77.9,61.7 	"
                  />
                  <polygon
                    class="st1"
                    points="213.1,85.6 123.8,35.2 123.8,0.1 243,67.8 	"
                  />
                  <polygon
                    class="st0"
                    points="29.9,89.7 123.8,35.2 123.8,0.1 -0.1,71.8 	"
                  />
                  <polygon
                    class="st2"
                    points="77.2,80.4 117.7,103.3 117.7,137.9 47.3,98.2 	"
                  />
                  <polygon
                    class="st3"
                    points="201.7,97.2 171.4,79.7 124.4,106.9 78.9,81.3 78.9,116.1 118.1,138.2 124.5,141.9 	"
                  />
                  <polygon
                    class="st1"
                    points="125.3,88.3 108.7,78.9 108.3,44.1 155.2,70.7 	"
                  />
                  <g>
                    <path
                      class="st1"
                      d="M272.8,74.8V23.7h31v6.6h-24v16.4h21.7v6.6h-21.7v21.5H272.8z"
                    />
                    <path
                      class="st1"
                      d="M312.9,22.1c2.7,0,4.9,2.2,4.9,4.9c0,2.7-2.2,4.8-4.9,4.8s-4.8-2.2-4.8-4.8C308.1,24.3,310.2,22.1,312.9,22.1
                                        z M309.6,74.8V40.2h6.7v34.6H309.6z"
                    />
                    <path
                      class="st1"
                      d="M332.8,74.8H326V40.2h6.6v5c2.5-4.3,6.6-6,10.7-6c8.3,0,12.4,6,12.4,13.7v22H349V54.1c0-4.8-2-8.7-8.1-8.7
                                        c-5.3,0-8.1,4.2-8.1,9.5L332.8,74.8L332.8,74.8z"
                    />
                    <path
                      class="st1"
                      d="M373,54.9l9.4-1.4c2.1-0.3,2.7-1.4,2.7-2.6c0-3.4-2.2-6.2-7.5-6.2c-4.8,0-7.4,3-7.8,7l-6.5-1.5
                                        C364,43.6,370,39,377.5,39C388,39,392,44.9,392,51.7v17.4c0,3,0.3,4.8,0.4,5.7h-6.6c-0.1-0.9-0.4-2.2-0.4-4.7
                                        c-1.5,2.4-5,5.8-11.2,5.8c-7.1,0-11.6-4.9-11.6-10.4C362.5,59.3,367,55.8,373,54.9z M385,59.8v-1.6l-10.6,1.6
                                        c-2.9,0.4-5,2.1-5,5.2c0,2.6,2.2,5,5.6,5C380.6,70.2,385,67.4,385,59.8z"
                    />
                    <path
                      class="st1"
                      d="M407.3,74.8h-6.8V40.2h6.6v5c2.5-4.3,6.6-6,10.7-6c8.3,0,12.4,6,12.4,13.7v22h-6.8V54.1c0-4.8-2-8.7-8.1-8.7
                                        c-5.3,0-8.1,4.2-8.1,9.5L407.3,74.8L407.3,74.8z"
                    />
                    <path
                      class="st1"
                      d="M443.2,57.3c0,7.9,5,12.2,10.6,12.2c6.5,0,8.9-4.4,9.6-7.1l6,2.6c-1.7,5-6.6,10.8-15.6,10.8
                                        c-10.1,0-17.5-7.9-17.5-18.4c0-10.8,7.6-18.4,17.4-18.4c9.2,0,14,5.8,15.4,11l-6.1,2.6c-0.9-3.4-3.4-7.3-9.3-7.3
                                        C448.3,45.3,443.2,49.3,443.2,57.3z"
                    />
                    <path
                      class="st1"
                      d="M505.4,64.8c-1.9,6.1-7.5,10.9-15.6,10.9c-9.3,0-17.4-6.8-17.4-18.5c0-10.9,7.8-18.3,16.6-18.3
                                        c10.7,0,16.6,7.3,16.6,18.1c0,0.9-0.1,1.7-0.1,2.2h-26.1c0.1,6.2,4.6,10.5,10.4,10.5c5.6,0,8.4-3.1,9.7-7L505.4,64.8z M498.5,53.8
                                        c-0.1-5-3.4-8.9-9.5-8.9c-5.7,0-9.1,4.4-9.4,8.9H498.5z"
                    />
                    <path
                      class="st3"
                      d="M512.5,74.8V23.7h9.9v41.5h22.8v9.5h-32.7V74.8z"
                    />
                    <path
                      class="st3"
                      d="M584.8,57.1c0,10.9-8,18.8-18.6,18.8s-18.6-7.9-18.6-18.8s8-18.8,18.6-18.8S584.8,46.1,584.8,57.1z
                                        M575.3,57.1c0-6.7-4.3-10.1-9-10.1s-9,3.4-9,10.1c0,6.6,4.3,10.1,9,10.1S575.3,63.8,575.3,57.1z"
                    />
                    <path
                      class="st3"
                      d="M590.6,74.8V22.6h9.4v20.6c1.6-2.5,5.5-4.8,10.7-4.8c10.4,0,16.3,8,16.3,18.5c0,10.7-6.6,18.7-16.7,18.7
                                        c-4.9,0-8.6-2.2-10.5-5.2v4.3h-9.2V74.8z M608.7,46.9c-4.8,0-8.9,3.5-8.9,10c0,6.4,4,10.1,8.9,10.1s8.8-3.6,8.8-10.1
                                        S613.6,46.9,608.7,46.9z"
                    />
                    <path
                      class="st3"
                      d="M632.9,74.8V22.6h9.4v20.6c1.6-2.5,5.5-4.8,10.7-4.8c10.4,0,16.3,8,16.3,18.5c0,10.7-6.6,18.7-16.7,18.7
                                        c-4.9,0-8.6-2.2-10.5-5.2v4.3h-9.2V74.8z M651,46.9c-4.8,0-8.9,3.5-8.9,10c0,6.4,4,10.1,8.9,10.1s8.8-3.6,8.8-10.1
                                        S655.9,46.9,651,46.9z"
                    />
                    <path
                      class="st3"
                      d="M675.6,88.7l8.4-18.4l-15-31h10.7l9.4,20.7l8.7-20.7h10.2l-22.2,49.4H675.6z"
                    />
                  </g>
                  <g>
                    <path
                      class="st0"
                      d="M272.8,98.4h7.4c3.4,0,5.8,0.5,7.3,1.4c1.5,1,2.3,2.5,2.3,4.6c0,1.4-0.3,2.6-1,3.5s-1.5,1.5-2.6,1.6v0.2
                                        c1.5,0.3,2.6,1,3.2,1.9c0.7,0.9,1,2.1,1,3.7c0,2.2-0.8,3.8-2.3,5s-3.7,1.8-6.4,1.8h-8.9V98.4z M277.8,107.8h2.9
                                        c1.4,0,2.3-0.2,3-0.6c0.6-0.4,0.9-1.1,0.9-2.1c0-0.9-0.3-1.6-1-2s-1.7-0.6-3.1-0.6H278v5.3H277.8z M277.8,111.8v6.2h3.3
                                        c1.4,0,2.4-0.3,3.1-0.8c0.7-0.5,1-1.3,1-2.4c0-2-1.4-2.9-4.2-2.9h-3.2V111.8z"
                    />
                    <path
                      class="st0"
                      d="M315.3,122.1h-13.6V98.3h13.6v4.1h-8.6v5.2h8v4.1h-8v6.1h8.6V122.1z"
                    />
                    <path
                      class="st0"
                      d="M336,122.1h-5v-19.5h-6.4v-4.2h17.8v4.2H336V122.1z"
                    />
                    <path
                      class="st0"
                      d="M367.2,122.1l-1.7-5.6h-8.6l-1.7,5.6h-5.4l8.4-23.8h6.1l8.4,23.8H367.2z M364.3,112.3c-1.6-5.1-2.5-8-2.7-8.7
                                        s-0.3-1.2-0.4-1.6c-0.4,1.4-1.4,4.8-3.1,10.2h6.2V112.3z"
                    />
                  </g>
                </g>
              </svg>
            </template>
          </router-link>
        </div>
      </div>
      <div
        v-if="!non_beta_user && (ExplanationVideoPopupActive || explanationVideoFromhamburgerMenuClicked)"
        class="profile-tabs__content-video-popup"
        @click="clickOutside($event)"
      >
        <div
          class="profile-tabs__content-video-popup-content"
          oncontextmenu="return false;"
        >
          <div
            class="profile-tabs__content-video-popup-close"
            @click="popupClose"
          />
          <div class="profile-tabs__content-video-popup-content-video">
            <video
              ref="video"
              controls
              class="profile-tabs__content-video-popup-content-video-player"
              :src="userRoleSpecificVideoLink"
              autoplay
              controlsList="nodownload"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </header>
    <transition name="fade-in-fast">
      <BlockPopupInvite
        v-if="showPopup && loggedIn && $route.name !== 'Sign Up'"
        @closePopup="closePopup"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ClickOutside from 'vue-click-outside'
import { getImagesAsset } from '@/config/util'
import { getDemoAsset, checkDomain } from '@/config/util'
import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
import BlockPopupInvite from '@/components/blocks/BlockPopup/BlockPopupInvite.vue'
import { mapState } from 'vuex'

interface Data {
  placeholderImage: string
  notificationImage: string
  notificationNum: number
  active: boolean
  pageCheck: boolean
  showPopup: boolean
  ExplanationVideoPopupActive: boolean
}

export default Vue.extend({

  components: {
    SvgIcon,
    BlockPopupInvite,
  },

  directives: {
    ClickOutside,
  },

  data(): Data {
    return {
      placeholderImage: getImagesAsset('placeholders/user_placeholder.png'),
      notificationImage: getDemoAsset('profile/notification_icon.jpg'),
      notificationNum: 17,
      active: false,
      pageCheck: false,
      showPopup: false,
      ExplanationVideoPopupActive: false,
    }
  },

  created() {
    this.user
  },

  methods: {
    async handleManageMySubscription() {
      const response = await this.$store.dispatch('getSparkUrl', {
        return_url: `${window.location.origin}${window.location.pathname}`,
      })
      window.location.href = response.data.data.sparkLogin.success
    },

    clickOutside(event) {
      // If target is not video, then close popup
      if (!this.$refs.video.contains(event.target)) {
        this.ExplanationVideoPopupActive = false
      }
    },

    ExplanationVideo() {
      this.ExplanationVideoPopupActive = true
      this.$store.dispatch('explanationVideoFromhamburgerMenuClicked', false)
    },

    popupClose() {
      this.ExplanationVideoPopupActive = false
      this.$store.dispatch('explanationVideoFromhamburgerMenuClicked', false)
    },

    /**
     * @Author Nikola Popov
     * @description
     * logut user
     * remove local storage and redirect to login route
     */
    logout() {
      this.$store.dispatch('logout').then(() => {
        if (process.env.VUE_APP_GTM_ENVIRONMENT === 'production') {

          //Google Analytics userID
          var auth = JSON.parse(localStorage.getItem('auth'))

          window['dataLayer'] = window['dataLayer'] || []
          window['dataLayer'].push({
            'event': 'logout',
            'userId': auth?.user?.id,
          })
        }


        localStorage.removeItem('auth')
        localStorage.removeItem('chatbot')
        window.location.href = "/login"

      })

    },
    hide() {
      this.active = false
    },

    /**
     * @Author Nikola Popov
     * @description
     * remove refresh token on signup page and redirect to login
     */
    clearToken() {
      if (this.$router.currentRoute.path === '/sign-up/lender/2') {
        const token = localStorage.getItem('tempToken')
        if (token !== null) {
          localStorage.removeItem('tempToken')
          //TODO in Pre MVP push to Landing page
          //TODO for MVP push to login
          //this.$router.push('/login');
        }
      }
    },
    openPopup() {
      this.showPopup = true
    },
    closePopup() {
      this.showPopup = false
    },
    goTo() {
      if (this.$route.path !== '/profile-settings') {
        this.$router.push({ path: '/profile-settings' })
      }
    },

    // Checks if there is a variable in .env file and returns true if so
    logoChange() {
      return checkDomain()
    },
  },


  // if user logedin show header and footer
  computed: {
    isTrialing() {
      return this.$store.getters.subscriptionIsTrial
    },
    loggedIn() {
      return this.$store.getters.getLoggedIn
    },
    user() {
      return this.$store.getters.getUser
    },
    image() {
      return this.$store.getters.getProfileImage
    },
    subscription() {
      return this.$store.state.Broker.subscription
    },
    subscriptionName() {
      let plan = this.$store.state.Broker.subscription
      if(plan?.status === 'active') {
        return plan?.name
      } else if (plan.status === 'trialing') {
        return `${plan?.name} - Free` 
      } else {
        return 'Free tier'
      }
    },
    daysRemaining() {
      let today = new Date()
      var endsAt = new Date(this.subscription?.ends_at)
      
      let diff = endsAt.getTime() - today.getTime()
      let days = Math.round(diff / (1000 * 3600 * 24))

      return days > 1 ? `${days} days` :  `${days} day`
    },

    ...mapState({
      non_beta_user: state => state['User'].non_beta_user,
    }),

    explanationVideoFromhamburgerMenuClicked() {
      return this.$store.getters.getExplanationVideoClicked
    },

    // Returns a proper video link for broker or lender, for explanation video popup
    userRoleSpecificVideoLink() {
      return this.$store.getters.getUser.role === 'broker' ? 'https://financelobby-production.s3.amazonaws.com/assets/Broker.mp4' : 'https://financelobby-production.s3.amazonaws.com/assets/FinanceLobby051222.mp4'
    },
  },

  beforeMount() {
    // this.checkPages();
  },

  mounted() {
    this.$root.$on('logout-beta', function () {
      this.logout()
    })
  },
})
</script>

<style lang="scss" scoped>
.site-header {
  padding: 29px 0;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;

  &.site-header--dashboard {
    padding: 10px 0;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background-color: $white;
    z-index: 10000;
    box-shadow: 0 0 15px 0 rgba(241, 247, 247, 0.9);
  }

  @include mq($lg) {
    padding: 15px 0;

    &.site-header--dashboard {
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.23);
      padding-left: 45px;
    }
  }
}

.site-header__base-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.site-header__base-branding {
  display: flex;
  align-items: center;

  @include mq($sm) {
    width: 100%;
    justify-content: center;
  }
}

.site-header__base-logo {
  color: $white;
  display: block;
  max-width: 222px;
}

.site-header__base-logo-img {
  display: block;
  width: 100%;
}

.site-header__base-logo-img.beta {
  .st0 {
    fill: #118F8C;
  }

  .st1 {
    fill: #045D63;
  }

  .st2 {
    fill: #CE781B;
  }

  .st3 {
    fill: #F7AB42;
  }
}

.site-header__hamburger {
  @include mq($xl) {
    right: 15px;
    @include center(y);
    z-index: 1100;
  }
}

// Dashboard Header
.site-header__dashboard {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.site-header__dashboard-container {

  @include mq($lg + 1, min) {
    max-width: calc(100% - 55px);
  }
}

.site-header__profile-img {
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-right: 17px;

  @include mq($lg) {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
}

.site-header__profile {
  position: relative;

  @include mq($lg) {
    &.opened {
      .site-header__profile-icon {
        color: $blue-chill;
      }

      .site-header__profile-menu {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
        transform: translateY(100%);
      }
    }
  }

  @include hover {
    .site-header__profile-icon {
      color: $blue-chill;
    }

    .site-header__profile-menu {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
      transform: translateY(100%);
    }
  }
}

.site-header__profile-top {
  display: flex;
  align-items: center;
  cursor: pointer;

  & .site-header__profile-wrapper {
    display: flex;
    flex-direction: column;

    &>span {
      font-size: 12px;
      background-color: $yellow-orange;
      border-radius: 6px;
      padding: 0px 6px;
      width: 100%;
      display: block;
      margin-top: 2px;
      text-align: center;
    }

    &>span.subscription__free-tier {
      background-color: $grey-light;
    }
  }
}

.site-header__profile-title {
  font-size: 16px;
  color: $shark;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 1.2;
  position: relative;
  padding-right: 27px;

  @include mq($lg) {
    font-size: 14px;
    padding-right: 19px;
  }

  @include mq($sm) {
    font-size: 0;
  }
}

.site-header__profile-icon {
  font-size: 15px;
  @include center(y, absolute);
  right: 0;
  transition: $dur $ease;

  @include mq($lg) {
    font-size: 13px;
  }
}

.site-header__profile-menu {
  position: absolute;
  width: 100%;
  background-color: $white;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  bottom: -2px;
  transform: translateY(calc(100% + 20px));
  padding: 23px 20px 22px;
  border-radius: 5px;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: $dur $ease;
  min-width: 200px;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 0;
    width: 100%;
    height: 10px;
  }

  @include mq($lg + 1, min) {
    left: -3px;
  }

  @include mq($lg) {
    padding: 19px 15px 18px;
    right: -10px;
  }
}

.site-header__profile-menu-item {
  margin-bottom: 16px;

  &:last-of-type {
    margin-bottom: 0;
  }

  @include mq($lg) {
    margin-bottom: 10px;
  }
}

.site-header__profile-menu-link,
.site-header__profile-menu-button {
  font-size: 16px;
  color: $shark;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 1.2;
  position: relative;
  display: block;
  padding: 5px 0 5px 28px;
  transition: $dur $ease;

  @include hover {
    color: $blue-chill;

    .site-header__profile-menu-icon {
      color: $yellow-orange;
    }
  }

  @include mq($lg) {
    font-size: 14px;
  }
}

.site-header__profile-menu-button {
  border: none;
  overflow: visible;
  background: transparent;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
}

.site-header__profile-menu-icon {
  font-size: 14px;
  color: $blue-chill;
  left: 0;
  transition: $dur $ease;
  @include center(y, absolute);
}

// Notifications
.site-header__notification {
  position: relative;
  margin-right: 40px;
  margin-top: 12px;

  @include hover {
    .site-header__notification-bottom {
      transform: translateY(calc(100% + 15px));
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }
  }
}

.site-header__notification-top {
  position: relative;
  cursor: pointer;
}

.site-header__notification-icon {
  font-size: 23px;
  color: $mosque;
}

.site-header__notification-num {
  font-size: 11px;
  color: $white;
  line-height: 1;
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-color: $yellow-orange;
  display: flex;
  align-items: center;
  justify-content: center;
}

.site-header__notification-bottom {
  position: absolute;
  right: -30px;
  bottom: 0;
  transform: translateY(calc(100% + 30px));
  background-color: $white;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  min-width: 495px;
  border-radius: 5px;
  transition: $dur $ease;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: -30px;
    width: 100%;
    height: 30px;
  }
}

.site-header__invite {
  margin-right: 40px;
  height: 40px; //safari fix

  @include mq($sm) {
    .btn--small {
      min-width: 90px;
      padding: 8px 10px;
    }

    margin-right: 15px;
  }
}

.site-header__notification-bottom {
  padding: 31px 24px 31px 30px;
}

.site-header__notification-list {
  padding-bottom: 30px;
  border-bottom: 1px solid #f0f7f7;
}

.site-header__notification-list-item {
  display: flex;
  align-items: center;
  padding-right: 35px;
  position: relative;
  margin-bottom: 28px;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.site-header__notification-list-img {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  margin-right: 31px;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}

.site-header__notification-list-title {
  font-size: 16px;
  line-height: 1.1;
  font-weight: 400;
  color: $shark;
  letter-spacing: 0.08px;
  display: block;

  +.site-header__notification-list-time {
    margin-top: 10px;
  }
}

.site-header__notification-list-title-name {
  font-style: italic;
}

.site-header__notification-list-title-status {
  color: $blue-chill;
  font-weight: 600;
  border-bottom: 1px solid transparent;
  transition: $dur $ease;

  @include hover {
    border-bottom: 1px solid $blue-chill;
  }
}

.site-header__notification-list-time {
  font-size: 12px;
  color: $santas-gray;
  font-weight: 400;
  line-height: 1.16;
  display: block;
  padding-left: 3px;
}

.site-header__notification-list-remove {
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  color: $shark;
  @include center(y, absolute);
  right: 0;
  transition: $dur $ease;

  @include hover {
    color: $yellow-orange;
  }
}

.site-header__notification-button-holder {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0 0;
}

.site-header__base-branding svg {
  width: 100%;

  .st0 {
    fill: #118F8C;
  }

  .st1 {
    fill: #045D63;
  }

  .st2 {
    fill: #CE781B;
  }

  .st3 {
    fill: #F7AB42;
  }
}

.profile-tabs__content-video-popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba($white, 0.7);
}

.profile-tabs__content-video-popup-content-video-player {
  max-width: 980px;
  width: 100%;
}

.profile-tabs__content-video-popup-content {
  position: relative;
  padding: 0 10px;
}

.profile-tabs__content-video-popup-close {
  position: absolute;
  top: -2px;
  right: -33px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: $dur $ease;

  @include mq(1200px) {
    top: -27px;
    right: 8px;
  }

  &:hover {

    &::before,
    &::after {
      transition: $dur $ease;
      transform: translate(-50%, -50%) rotate(0);
    }
  }

  &::before,
  &::after {
    content: '';
    height: 2px;
    width: 21px;
    background-color: $santas-gray;
    @include center;
    transition: $dur $ease;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}

.explanation-video {
  @include mq(414px, max) {
    display: none;
  }
}
</style>
