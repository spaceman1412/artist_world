export type AppNavigatorParamList = {
  tab: undefined;
  home: undefined;
  resetDone: undefined;
  resetPassword: undefined;
  forgot: undefined;
  otpVerify: {confirm: any};
  counter: undefined;
  prologue: undefined;
  phoneLogin: {flagCode: string; flagNumber: string};
  createAccount: undefined;
  selectCountry: undefined;
  login: undefined;
  profileDetails: undefined;
  profile: undefined;
  profileDetail: {uid: string};
  discover: undefined;
  messages: undefined;
  findOutMatch: undefined;
  matchList: undefined;
  editProfiles: undefined;
  selectCity: undefined;
};

export type ProfileDetailsNavigatorParamList = {
  basicInfo: undefined;
  sexSelect: undefined;
  interests: undefined;
  role: undefined;
};

export type EditProfileNavigatorParamList = {
  editProfile: undefined;
  editRole: {roles: Array<string>};
  editInterest: {interests : Array<string>};
  editGallery: {gallery : Array<string>};
}