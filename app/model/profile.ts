namespace Profile {
  export interface BasicInfo {
    firstName: string;
    lastName: string;
    birthDate: string;
    location: string;
  }

  export interface UserInfo extends BasicInfo {
    sex: 'man' | 'woman' | 'not';
    musicInterests: string[];
    musicRoles: string[];
    gallery: string[];
    about: string;
    favouriteSong: string;
    avatarUrl: string;
  }
}
