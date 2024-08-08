// import apiClient from './../../utils/util';
// import { Participant } from '@/types/openvidu';
// import { useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';

// interface MeetingDetails {
//   id: number;
//   interviewId: string;
// }
// const MenteeAttendButton = () => {
//   const navigate = useNavigate();
//   const [memberEmail, setMemberEmail] = useState<string>('');
//   const [memberId, setMemberId] = useState<string>('');
//   const [newName, setNewName] = useState<string>('');
//   const [sessionId, setSessionId] = useState<string>();
//   const getToken = async (sessionId: string) => {
//     try {
//       const tokenResponse = await apiClient.post(`/meeting/sessions/${sessionId}/connections`);
//       return tokenResponse.data;
//     } catch (error) {
//       console.error('Error creating token:', error);
//       throw error;
//     }
//   };

//   async function fetchMeetingBySessionId(sessionId: string): Promise<MeetingDetails | undefined> {
//     try {
//       const response = await apiClient.get(`/meeting/sessions/${sessionId}`);
//       const meetingDto = response.data;

//       console.log('Meeting details:', meetingDto.id);
//       console.log(meetingDto.interviewId);

//       return {
//         id: meetingDto.id,
//         interviewId: meetingDto.interviewId,
//       };
//     } catch (error) {
//       console.error('Error fetching meeting details:', error);
//       return undefined;
//     }
//   }

//   const EnterParticipant = async (
//     meetingId: number,
//     participant: Participant
//   ): Promise<Participant> => {
//     try {
//       const response = await apiClient.post<Participant>(
//         `/participants/meetings/${meetingId}`,
//         participant
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Error adding participant:', error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     const fetchMemberData = async () => {
//       if (!memberEmail) return;
//       try {
//         const memberResponse = await apiClient.get('/members/search', {
//           params: { email: memberEmail },
//         });

//         const memberData = memberResponse.data;
//         const memberIdFromResponse = memberData.id;
//         console.log(memberIdFromResponse);
//         setMemberId(memberIdFromResponse);

//         if (memberIdFromResponse) {
//           const sessionResponse = await apiClient.get(
//             `/meeting-notifications/sessions/member/${memberIdFromResponse}`
//           );
//           const sessionIdFromResponse = sessionResponse.data;
//           console.log(sessionIdFromResponse);
//           setSessionId(sessionIdFromResponse);

//           if (sessionIdFromResponse && memberIdFromResponse) {
//             const notificationStatus = await checkNotification(
//               sessionIdFromResponse,
//               memberIdFromResponse
//             );
//             setCanCreateRoom(notificationStatus);
//           }
//         }
//       } catch (error) {
//         console.error('데이터를 가져오는 중 오류 발생:', error);
//       }
//     };

//     fetchMemberData();
//   }, [memberEmail]);

//   const handleCreateSession = async (sessionId: string | undefined) => {
//     if (sessionId === undefined) {
//       console.error('세션 ID가 정의되지 않았습니다.');
//       return;
//     }
//     try {
//       const token = await getToken(sessionId);

//       const meetingDetails = await fetchMeetingBySessionId(sessionId);

//       if (meetingDetails) {
//         const { id: roomId, interviewId } = meetingDetails;
//         const participant: Participant = {
//           memberId: memberId,
//           name: newName,
//           role: 'mentee',
//           isMuted: false,
//           isCameraOn: false,
//         };
//         console.log(participant);

//         await EnterParticipant(roomId, participant);

//         navigate('/video-chat', {
//           state: {
//             id: memberId,
//             sessionId,
//             meetingId: roomId,
//             interviewId: interviewId,
//             token,
//             userName: newName,
//             isHost: false,
//             isMicroOn: false,
//             isCameraOn: false,
//           },
//         });
//       } else {
//         console.error('Failed to fetch meeting details.');
//       }
//     } catch (error) {
//       console.error('세션 생성 중 오류 발생:', error);
//       throw error;
//     }
//   };
//   return (
//     <div>
//       {canCreateRoom && (
//         <Button
//           // className="bg-red-500 text-white hover:bg-red-600"
//           text="방 참여하기"
//           onClick={() => handleCreateSession(sessionId)}
//         />
//       )}
//     </div>
//   );
// };

// export default MenteeAttendButton;
