const texts = [
 {
     text: 'Accounting',
     id: 'ACC',
     key: 0
 },
 {
    text: 'Art',
    id: 'ART',
    key: 1
},
{
    text: 'Asian Studies',
    id: 'ASN',
    key: 2
},
{
    text: 'Audio Engineering',
    id: 'AET',
    key: 3
},
{
    text: 'BELL Core',
    id: 'BEL',
    key: 4
},
{
    text: 'Biochemistry and Molecular Mio',
    id: 'BNB',
    key: 5
},
{
    text: 'Biology',
    id: 'BIO',
    key: 6
},
{
    text: 'Business Administration',
    id: 'BAD',
    key: 7
},
{
    text: 'Chemistry',
    id: 'CEM',
    key: 8
},
{
    text: 'Chinese',
    id: 'CHN',
    key: 9
},
{
    text: 'Communication Studies',
    id: 'COM',
    key: 10
},
{
    text: 'Computer Science',
    id: 'CSC',
    key: 11
},
{
    text: 'Dance',
    id: 'DAN',
    key: 12
},
{
    text: 'Economics',
    id: 'ECO',
    key: 13
},
{
    text: 'Education',
    id: 'EBU',
    key: 14
},
{
    text: 'English',
    id: 'ENG',
    key: 15
},
{
    text: 'English Literature',
    id: 'ENL',
    key: 16
},
{
    text: 'English Writing',
    id: 'ENW',
    key: 17
},
{
    text: 'Entertainment Industry Studies',
    id: 'EIS',
    key: 18
},
{
    text: 'Entrepreneurship',
    id: 'ETP',
    key: 19
},
{
    text: 'Evironmental Studies',
    id: 'ENV',
    key: 20
},
{
    text: 'Excercise Science',
    id: 'EXS',
    key: 21
},
{
    text: 'Finance',
    id: 'FIN',
    key: 22
},
{
    text: 'French',
    id: 'FRE',
    key: 23
},
{
    text: 'German',
    id: 'GER',
    key: 24
},
{
    text: 'Global Leadership',
    id: 'GLS',
    key: 25
},
{
    text: 'History',
    id: 'HIS',
    key: 26
},
{
    text: 'Honors',
    id: 'HON',
    key: 27
},
{
    text: 'Humanities',
    id: 'HUM',
    key: 28
},
{
    text: 'International Business',
    id: 'INB',
    key: 29
},
{
    text: 'Italain',
    id: 'ITL',
    key: 30
},
{
    text: 'Japanese',
    id: 'JPN',
    key: 31
},
{
    text: 'Lib. Arts & Soc. Sci Undergrad',
    id: 'CAS',
    key: 32
},
{
    text: 'Liberal Studies',
    id: 'LIS',
    key: 33
},
{
    text: 'Management',
    id: 'MGT',
    key: 34
},
{
    text: 'Marketing',
    id: 'MKT',
    key: 35
},
{
    text: 'Mathematics',
    id: 'MTH',
    key: 36
},
{
    text: 'Media Studies',
    id: 'MDS',
    key: 37
},
{
    text: 'Mgt Information Systems',
    id: 'MIS',
    key: 38
},
{
    text: 'Military Science',
    id: 'MLT',
    key: 39
},
{
    text: 'Motion Pictures',
    id: 'MOT',
    key: 40
},
{
    text: 'Music Business',
    id: 'MBU',
    key: 41
},
{
    text: 'Music-MAA-Cl Voice/Support',
    id: 'MAA',
    key: 42
},
{
    text: 'Music-MAB-Cl Piano/Support',
    id: 'MAB',
    key: 43
},
{
    text: 'Music-MAD-Cl Guitar/Support',
    id: 'MAD',
    key: 44
},
{
    text: 'Music-MAE-Cl Brass',
    id: 'MAE',
    key: 45
},
{
    text: 'Music-MAF-Cl Woodwinds',
    id: 'MAF',
    key: 46
},
{
    text: 'Music-MAG-Cl Strings',
    id: 'MAG',
    key: 47
},
{
    text: 'Music-MAH-Cl Percussion',
    id: 'MAF',
    key: 48
},
{
    text: 'Music-MAI-Cl Instr/Support',
    id: 'MAI',
    key: 49
},
{
    text: 'Music-MAK-Cl Comp/Seminar',
    id: 'MAK',
    key: 50
},
{
    text: 'Music-MAM-Cl Priv Conducting',
    id: 'MAM',
    key: 51
},
{
    text: 'Music-MAN-Classical Carillon',
    id: 'MAN',
    key: 52
},
{
    text: 'Music-MAP-Cl Organ/Support',
    id: 'MAP',
    key: 53
},{
    text: 'Music-MBA-Comm Voice/Support',
    id: 'MBA',
    key: 54
},{
    text: 'Music-MBB-Comm Piano/Support',
    id: 'MBB',
    key: 55
},{
    text: 'Music-MBD-Comm Guitar/Support',
    id: 'MBD',
    key: 56
},{
    text: 'Music-MBE-Comm Brass',
    id: 'MBE',
    key: 57
},{
    text: 'Music-MBF-Comm Woodwinds',
    id: 'MBF',
    key: 58
},{
    text: 'Music-MBG-Comm Strings',
    id: 'MBG',
    key: 59
},
{
    text: 'Music-MBH-Comm Percussion',
    id: 'MBH',
    key: 60
},
{
    text: 'Music-MBI-Comm Instr/Support',
    id: 'MBI',
    key: 61
},
{
    text: 'Music-MBJ-Comm Elect Bass',
    id: 'MBJ',
    key: 62
},
{
    text: 'Music-MBK-Comm Composition',
    id: 'MBK',
    key: 63
},
{
    text: 'Music-MCY-Blended Recital',
    id: 'MCY',
    key: 64
},
{
    text: 'Music-MFA-Class Applied Voice',
    id: 'MFA',
    key: 65
},{
    text: 'Music-MFB-Class Piano',
    id: 'MFB',
    key: 66
},{
    text: 'Music-MFD-Class Guitar',
    id: 'MFD',
    key: 67
},{
    text: 'Music-MFI-Chamber Ensemble',
    id: 'MFI',
    key: 68
},{
    text: 'Music-MFK-Class Composition',
    id: 'MFK',
    key: 69
},{
    text: 'Music-MUC-Commercial Music',
    id: 'MUC',
    key: 70
},{
    text: 'Music-MUE-Music Education',
    id: 'MUE',
    key: 71
},{
    text: 'Music-MUG-General Requirements',
    id: 'MUG',
    key: 72
},{
    text: 'Music-MUH-History',
    id: 'MUH',
    key: 73
},{
    text: 'Music-MUK-Technology Comp',
    id: 'MUK',
    key: 74
},{
    text: 'Music-MUN-Ensembles',
    id: 'MUN',
    key: 75
},{
    text: 'Music-MUP-Pedagogy',
    id: 'MUP',
    key: 76
},{
    text: 'Music-MUR-Church Music',
    id: 'MUR',
    key: 77
},{
    text: 'Music-MUT-Theory',
    id: 'MUT',
    key: 78
},{
    text: 'Music-MUY-Music Therapy',
    id: 'MUY',
    key: 79
},{
    text: 'Neuroscience',
    id: 'NEU',
    key: 80
},{
    text: 'Nursing',
    id: 'NUR',
    key: 81
},{
    text: 'Nutrition',
    id: 'NTR',
    key: 82
},{
    text: 'Philosophy',
    id: 'PHI',
    key: 83
},{
    text: 'Physics',
    id: 'PHY',
    key: 84
},{
    text: 'Physics',
    id: 'PHY',
    key: 85
},{
    text: 'Political Science',
    id: 'PSC',
    key: 86
},{
    text: 'Psychology',
    id: 'PSY',
    key: 87
},{
    text: 'Public Health',
    id: 'BPH',
    key: 88
},{
    text: 'Public Relations',
    id: 'PRL',
    key: 89
},{
    text: 'Publishing',
    id: 'PUB',
    key: 90
},{
    text: 'Religion',
    id: 'REL',
    key: 91
},{
    text: 'Sciences & Math Undergraduate',
    id: 'CSM',
    key: 92
},{
    text: 'Social Entrepreneurship',
    id: 'SET',
    key: 93
},{
    text: 'Social Work',
    id: 'SWK',
    key: 94
},{
    text: 'Sociology',
    id: 'SOC',
    key: 95
},{
    text: 'Songwriting',
    id: 'SNG',
    key: 96
},{
    text: 'Spanish',
    id: 'SPA',
    key: 97
},{
    text: 'Sport Administration',
    id: 'SAM',
    key: 98
},{
    text: 'Sports Medicine',
    id: 'SPM',
    key: 99
},{
    text: 'Strength and Conditioning',
    id: 'STR',
    key: 100
},{
    text: 'Theatre and Drama',
    id: 'TDR',
    key: 101
},{
    text: 'Watkins College',
    id: 'WAT',
    key: 102
},{
    text: 'Wellness',
    id: 'WEL',
    key: 103
}
];

export default texts;