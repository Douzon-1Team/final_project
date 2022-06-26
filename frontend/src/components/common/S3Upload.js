import S3 from 'react-aws-s3';
import { v4 } from 'uuid';
import axios from 'axios';
import {useSelector} from "react-redux";
window.Buffer = window.Buffer || require("buffer").Buffer;

const S3Upload = () => {
    const userName = useSelector(state => { return state });
    const imagePatchConfig = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const handleClick = (event) => {
        const file = event.target.files[0];
        const newFileName = v4();
        const config = {
            bucketName: process.env.REACT_APP_BUCKET_NAME,
            region: process.env.REACT_APP_REGION,
            accessKeyId: process.env.REACT_APP_ACCESS_ID,
            secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
        };
        const ReactS3Client = new S3(config);
        if (file) {
            if (file.size >= 1 * 1024 * 1024) {
                alert('1mb 이하의 파일만 업로드 가능합니다.');
                event.target.value = null;
            } else {
                if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
                    console.log(file);
                    // ReactS3Client.uploadFile(file, 'profile_'+file.name)
                    ReactS3Client.uploadFile(file, `profile-${userName.EMP_INFO.empInfo.empno}-`+newFileName)
                        .then((data) => { console.log('1234')
                        axios.post('/profile/updateImg', { image: data.location }, imagePatchConfig)
                            .then((res) => {
                                console.log('이미지 전송 완료'); //res.data, '~~'
                                    // TODO : localStorage에 저장하는 것이 괜찮을까? 고민
                                    localStorage.setItem(
                                        'profile',
                                        res.data
                                    );
                                    // window.location.reload();
                                }
                            )
                            .catch((err) => { console.log(err, '이미지 변경 안됨'); });
                    }).catch((err) => console.log(err));
                } else {
                    alert('JPEG, PNG, JPG 파일만 업로드 가능합니다.');
                    event.target.value = null;
                }
            }
        }
    };

    return <input id='editicon' type='file' accept='image/*' onChange={handleClick} />
};

export default S3Upload;