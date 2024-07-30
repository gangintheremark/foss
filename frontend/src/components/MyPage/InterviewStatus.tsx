import { useEffect, useState } from 'react';
import { TbFileDownload } from 'react-icons/tb';
import apiClient from './../../utils/util';
import ClipLoader from 'react-spinners/ClipLoader';


const ApplicationStatus = ({ title }) => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await apiClient.get('/interviews/mentees');

                const data = response.data;
                setSchedules(data);
                
            } catch (error) {
                console.error('Error fetching schedules:', error);
                setSchedules([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSchedules();
    }, []);

    const handleFileDownload = (url) => {
        window.open(url, '_blank');
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader size={50} color={"#4CCDC6"} />
            </div>
        );
    }

    return (
        <>
            <table className="text-center border-separate border-spacing-4">
                <thead>
                    <tr>
                        <th className="w-20">No</th>
                        <th className="w-60">멘토 정보</th>
                        <th className="w-52">일시</th>
                        <th className="w-36">자기소개서</th>
                        <th className="w-20"></th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.length > 0 ? (
                        schedules.map((schedule, index) => (
                            <tr key={schedule.scheduleId}>
                                <td>{index + 1}</td>
                                <td>
                                    <span>{schedule.mentorInfo.companyName}</span>
                                    <span> {schedule.mentorInfo.department} </span>
                                    <span style={{ boxShadow: 'inset 0 -7px 0 rgb(76, 205, 198, 0.5)' }}>
                                        <b>{schedule.mentorInfo.name}</b>
                                    </span>
                                </td>
                                <td>{schedule.date}</td>
                                <td>
                                    <TbFileDownload
                                        className="ml-14 cursor-pointer"
                                        size={"1.4rem"}
                                        onClick={() => handleFileDownload(schedule.fileUrl)}
                                    />
                                </td>
                                <td>
                                    <div
                                        className="bg-[#4CCDC6] text-white rounded-2xl px-1 py-1">
                                        D-day
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No schedules available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default ApplicationStatus;
