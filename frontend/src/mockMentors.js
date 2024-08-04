const mockMentors = [
    {
        id: '1',
        name: 'Nguyen Van A',
        avatar: 'https://example.com/avatar1.jpg', // URL to avatar image
        menteeCount: 3,
        introduction1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        introduction2: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        rate: 4,
        numberRate: 5,
        keyword: 'Alexander',
        organization: 'Org1',
        specialization: 'Spec1',
        education: 'Edu1',
        industry: 'Ind1',
        other: 'Other1'
    },
    {
        id: '2',
        name: 'Tran Thi B',
        avatar: 'https://example.com/avatar2.jpg',
        menteeCount: 2,
        introduction1: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        introduction2: 'Nisi ut aliquip ex ea commodo consequat.',
        rate: 5,
        numberRate: 10
    },
    {
        id: '3',
        name: 'Le Van C',
        avatar: 'https://example.com/avatar3.jpg',
        menteeCount: 5,
        introduction1: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
        introduction2: 'Eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
        rate: 3,
        numberRate: 7
    },
    {
        id: '4',
        name: 'Pham Thi D',
        avatar: 'https://example.com/avatar4.jpg',
        menteeCount: 1,
        introduction1: 'Sunt in culpa qui officia deserunt mollit anim id est laborum.',
        introduction2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        rate: 4,
        numberRate: 12
    },
    {
        id: '5',
        name: 'Hoang Van E',
        avatar: 'https://example.com/avatar5.jpg',
        menteeCount: 4,
        introduction1: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        introduction2: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
        rate: 5,
        numberRate: 6
    },
    {
        id: '6',
        name: 'Nguyen Van F',
        avatar: 'https://example.com/avatar6.jpg',
        menteeCount: 3,
        introduction1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        introduction2: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        rate: 4,
        numberRate: 5
    },
    {
        id: '7',
        name: 'Tran Thi G',
        avatar: 'https://example.com/avatar7.jpg',
        menteeCount: 2,
        introduction1: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        introduction2: 'Nisi ut aliquip ex ea commodo consequat.',
        rate: 5,
        numberRate: 10
    },
    {
        id: '8',
        name: 'Le Van H',
        avatar: 'https://example.com/avatar8.jpg',
        menteeCount: 5,
        introduction1: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
        introduction2: 'Eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
        rate: 3,
        numberRate: 7
    },
    {
        id: '9',
        name: 'Pham Thi I',
        avatar: 'https://example.com/avatar9.jpg',
        menteeCount: 1,
        introduction1: 'Sunt in culpa qui officia deserunt mollit anim id est laborum.',
        introduction2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        rate: 4,
        numberRate: 12
    },
    {
        id: '10',
        name: 'Hoang Van J',
        avatar: 'https://example.com/avatar10.jpg',
        menteeCount: 4,
        introduction1: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        introduction2: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
        rate: 5,
        numberRate: 6
    },
    {
        id: '11',
        name: 'Nguyen Van K',
        avatar: 'https://example.com/avatar11.jpg',
        menteeCount: 3,
        introduction1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        introduction2: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        rate: 4,
        numberRate: 5
    },
    {
        id: '12',
        name: 'Tran Thi L',
        avatar: 'https://example.com/avatar12.jpg',
        menteeCount: 2,
        introduction1: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        introduction2: 'Nisi ut aliquip ex ea commodo consequat.',
        rate: 5,
        numberRate: 10
    },
    {
        id: '13',
        name: 'Le Van M',
        avatar: 'https://example.com/avatar13.jpg',
        menteeCount: 5,
        introduction1: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
        introduction2: 'Eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
        rate: 3,
        numberRate: 7
    },
    {
        id: '14',
        name: 'Pham Thi N',
        avatar: 'https://example.com/avatar14.jpg',
        menteeCount: 1,
        introduction1: 'Sunt in culpa qui officia deserunt mollit anim id est laborum.',
        introduction2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        rate: 4,
        numberRate: 12
    },
    {
        id: '15',
        name: 'Hoang Van O',
        avatar: 'https://example.com/avatar15.jpg',
        menteeCount: 4,
        introduction1: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        introduction2: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
        rate: 5,
        numberRate: 6
    },
    {
        id: '16',
        name: 'Nguyen Van P',
        avatar: 'https://example.com/avatar16.jpg',
        menteeCount: 3,
        introduction1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        introduction2: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        rate: 4,
        numberRate: 5
    },
    {
        id: '17',
        name: 'Tran Thi Q',
        avatar: 'https://example.com/avatar17.jpg',
        menteeCount: 2,
        introduction1: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        introduction2: 'Nisi ut aliquip ex ea commodo consequat.',
        rate: 5,
        numberRate: 10
    },
    {
        id: '18',
        name: 'Le Van R',
        avatar: 'https://example.com/avatar18.jpg',
        menteeCount: 5,
        introduction1: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
        introduction2: 'Eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
        rate: 3,
        numberRate: 7
    },
    {
        id: '19',
        name: 'Pham Thi S',
        avatar: 'https://example.com/avatar19.jpg',
        menteeCount: 1,
        introduction1: 'Sunt in culpa qui officia deserunt mollit anim id est laborum.',
        introduction2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        rate: 4,
        numberRate: 12
    },
    {
        id: '20',
        name: 'Hoang Van T',
        avatar: 'https://example.com/avatar20.jpg',
        menteeCount: 4,
        introduction1: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        introduction2: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
        rate: 5,
        numberRate: 6
    },
    {
        id: '21',
        name: 'Nguyen Van U',
        avatar: 'https://example.com/avatar21.jpg',
        menteeCount: 3,
        introduction1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        introduction2: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        rate: 4,
        numberRate: 5
    },
    {
        id: '22',
        name: 'Tran Thi V',
        avatar: 'https://example.com/avatar22.jpg',
        menteeCount: 2,
        introduction1: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        introduction2: 'Nisi ut aliquip ex ea commodo consequat.',
        rate: 5,
        numberRate: 10
    },
    {
        id: '23',
        name: 'Le Van W',
        avatar: 'https://example.com/avatar23.jpg',
        menteeCount: 5,
        introduction1: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
        introduction2: 'Eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
        rate: 3,
        numberRate: 7
    },
    {
        id: '24',
        name: 'Pham Thi X',
        avatar: 'https://example.com/avatar24.jpg',
        menteeCount: 1,
        introduction1: 'Sunt in culpa qui officia deserunt mollit anim id est laborum.',
        introduction2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        rate: 4,
        numberRate: 12
    },
    {
        id: '25',
        name: 'Hoang Van Y',
        avatar: 'https://example.com/avatar25.jpg',
        menteeCount: 4,
        introduction1: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        introduction2: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
        rate: 5,
        numberRate: 6
    },
    {
        id: '26',
        name: 'Nguyen Van Z',
        avatar: 'https://example.com/avatar26.jpg',
        menteeCount: 3,
        introduction1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        introduction2: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        rate: 4,
        numberRate: 5
    },
    {
        id: '27',
        name: 'Tran Thi AA',
        avatar: 'https://example.com/avatar27.jpg',
        menteeCount: 2,
        introduction1: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        introduction2: 'Nisi ut aliquip ex ea commodo consequat.',
        rate: 5,
        numberRate: 10
    },
    {
        id: '28',
        name: 'Le Van BB',
        avatar: 'https://example.com/avatar28.jpg',
        menteeCount: 5,
        introduction1: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
        introduction2: 'Eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
        rate: 3,
        numberRate: 7
    },
    {
        id: '29',
        name: 'Pham Thi CC',
        avatar: 'https://example.com/avatar29.jpg',
        menteeCount: 1,
        introduction1: 'Sunt in culpa qui officia deserunt mollit anim id est laborum.',
        introduction2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        rate: 4,
        numberRate: 12
    },
    {
        id: '30',
        name: 'Hoang Van DD',
        avatar: 'https://example.com/avatar30.jpg',
        menteeCount: 4,
        introduction1: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        introduction2: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
        rate: 5,
        numberRate: 6
    }
];

export default mockMentors;
