import {isDate} from 'moment';
import {
  BASE_URL,
  getAuthHeaders,
  Instance,
  multipartAuthHeaders,
} from '../../commonServices';
// ------------------------ALL APIs WITHOUT CUSTOM HOOKS-------------------------

//get User Reviews-------------
export const getReviews = async userId => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/astrologer/reviews/personal/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get  followers-------------
export const getfollowers = async () => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/astrologer/user-follow/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//toggle  services-------------
export const togleServices = async data => {
  const {id, body} = data;
  const authHeaders = await getAuthHeaders();
  console.log('authHeaders', authHeaders);
  try {
    const result = await Instance(
      'PATCH',
      BASE_URL + `/astrologer/astrologer-particular/${id}/`,
      authHeaders,
      body,
    );
    return result;
  } catch (error) {
    return error;
  }
};

//add  blog-------------
export const submitBlog = async data => {
  const authHeaders = await multipartAuthHeaders();
  try {
    const result = await Instance(
      'POST',
      BASE_URL + `/blog/astro-blog/`,
      authHeaders,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get  blog-------------
export const getBlogs = async () => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/blog/astro-blog/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//edit  blog-------------
export const editBlog = async data => {
  const {blogId, body} = data;
  const authHeaders = await multipartAuthHeaders();
  try {
    const result = await Instance(
      'PATCH',
      BASE_URL + `/blog/astro-blog/${blogId}/`,
      authHeaders,
      body,
    );
    return result;
  } catch (error) {
    return error;
  }
};

//delete  blog-------------
export const deleteBlog = async blogId => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'DELETE',
      BASE_URL + `/blog/astro-blog/${blogId}/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get  Pooja-------------
export const getPooja = async () => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/pooja/astro-pooja/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//add  Pooja-------------
export const submitPooja = async data => {
  const authHeaders = await multipartAuthHeaders();
  try {
    const result = await Instance(
      'POST',
      BASE_URL + `/pooja/astro-pooja/`,
      authHeaders,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};

//edit  Pooja-------------
export const editPooja = async data => {
  const {PoojaId, body} = data;
  const authHeaders = await multipartAuthHeaders();
  try {
    const result = await Instance(
      'PATCH',
      BASE_URL + `/pooja/astro-pooja/${PoojaId}/`,
      authHeaders,
      body,
    );
    return result;
  } catch (error) {
    return error;
  }
};

//delete  Pooja-------------
export const deletePooja = async PoojaId => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'DELETE',
      BASE_URL + `/pooja/astro-pooja/${PoojaId}/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

// reviewReply---------------
export const reviewReply = async data => {
  const authHeaders = await getAuthHeaders();
  const {id, body} = data;
  try {
    const result = await Instance(
      'PATCH',
      BASE_URL + `/astrologer/reviews/filter/${id}/ `,
      authHeaders,
      body,
    );
    return result;
  } catch (error) {
    return error;
  }
};

// deleteReview--------------------
export const deleteReview = async data => {
  const authHeaders = await getAuthHeaders();
  const {id, body} = data;
  try {
    const result = await Instance(
      'PATCH',
      BASE_URL + `/astrologer/reviews/filter/${id}/ `,
      authHeaders,
      body,
    );
    return result;
  } catch (error) {
    return error;
  }
};

// createOffer--------------------
export const submitOffer = async data => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'POST',
      BASE_URL + `/offers/offer/`,
      authHeaders,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};

// get list of offer------------
export const getOffer = async () => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/offers/offer/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

// active inactive offer-------------
export const toggleOffer = async data => {
  const {offerId, body} = data;
  console.log('data----', data);
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'PATCH',
      BASE_URL + `/offers/offer/${offerId}/`,
      authHeaders,
      body,
    );
    return result;
  } catch (error) {
    return error;
  }
};

// edit offer-------------
export const editOffer = async data => {
  const {offerId, body} = data;
  console.log('data----', data);
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'PATCH',
      BASE_URL + `/offers/offer/${offerId}/`,
      authHeaders,
      body,
    );
    return result;
  } catch (error) {
    return error;
  }
};

// // get Chat Room -------------
// export const getChatRoom = async () => {
//   const authHeaders = await getAuthHeaders();
//   try {
//     const result = await Instance(
//       'GET',
//       BASE_URL + `/chat/get-chatroom/`,
//       authHeaders,
//       {},
//     );
//     return result;
//   } catch (error) {
//     return error;
//   }
// };

// get Reels -------------
export const getReels = async () => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/reel/reel/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

// get Bank Details -------------
export const getBankDetails = async () => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/bank/bank/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

// add Bank Details -------------
export const addBankDetails = async data => {
  const authHeaders = await multipartAuthHeaders();
  try {
    const result = await Instance(
      'POST',
      BASE_URL + `/bank/bank/`,
      authHeaders,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};

// edit Bank Details -------------
export const editBankDetails = async data => {
  const {id, body} = data;
  console.log('id', id, body);
  const authHeaders = await multipartAuthHeaders();
  try {
    const result = await Instance(
      'PATCH',
      BASE_URL + `/bank/bank/${id}/`,
      authHeaders,
      body,
    );
    return result;
  } catch (error) {
    return error;
  }
};

// get timer for chat -------------
export const getChatTimer = async data => {
  const {userId, astrologerId} = data;
  console.log('userId');
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/chat/room-timer/?user=${userId}&&astrologer=${astrologerId}`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get  support chat-------------
export const getSupportChat = async () => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/predfined/messages/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get  MEDIA -------------
export const getMedia = async data => {
  const {userId, astroId} = data;
  // console.log("userId000000000000000000000000000000000000)))))))))))))))))))",userId,astroId)
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `chat/msg-attachment/?astrologer=${astroId}&user=${userId}`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//add  support chat-------------
export const addSupportMessage = async data => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'POST',
      BASE_URL + `/predfined/messages/`,
      authHeaders,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};

//edit  support chat-------------
export const editSupportMessage = async data => {
  const {id, body} = data;
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'PATCH',
      BASE_URL + `/predfined/messages/${id}/`,
      authHeaders,
      body,
    );
    return result;
  } catch (error) {
    return error;
  }
};

//edit  support chat-------------
export const deleteSupportMessage = async id => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'DELETE',
      BASE_URL + `/predfined/messages/${id}/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get wait list  -------------
export const getWaitList = async () => {
  const authHeaders = await getAuthHeaders();
  console.log('authHeaders---', authHeaders);
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/chat/assgin-astrologer/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//accept wait list request  -------------
export const acceptWaitListRequest = async data => {
  // const[hello,seHello]=useState()
  const {userId, astroId} = data;
  console.log('userId astroId================', userId);
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'PATCH',
      BASE_URL +
        `/chat/assgin-astrologer/?user=${userId}&astrologer=${astroId}&status=accept`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//cancel wait list request  -------------
export const cancelWaitListRequest = async data => {
  const {userId, astroId} = data;
  // console.log('userId astroId', userId, astroId);
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'PATCH',
      BASE_URL +
        `/chat/assgin-astrologer/?user=${userId}&astrologer=${astroId}&status=reject/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get chatr room -------------
export const getChatroom = async () => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/chat/get-chatroom/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get history of chat  -------------
export const getChatHistory = async id => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/chat/chat-history-list/?astrologer=${id}`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get history of call  -------------
export const getCallHistory = async id => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/chat/call-history-list/?astrologer=${id}`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get Particular Chat History  -------------
export const getParticularChatHistory = async data => {
  const authHeaders = await getAuthHeaders();
  const {userId, astroId} = data;
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/chat/chat-history/?user=${userId}&astrologer=${astroId}`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get Notie data  -------------
export const getNoticeData = async () => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/chat/show-notification/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get getAgoraToken   -------------
export const getAgoraToken = async data => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'POST',
      BASE_URL + `/chat/token/`,
      authHeaders,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get getAgoraToken   -------------
export const voiceCallStart = async data => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'POST',
      BASE_URL + `/chat/call-start-end/`,
      authHeaders,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get getAgoraToken   -------------
export const voiceCallEnd = async data => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'PATCH',
      BASE_URL + `/chat/call-start-end/`,
      authHeaders,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};

//toggle  services-------------
export const updateProfile = async data => {
  const {id, body} = data;
  const authHeaders = await multipartAuthHeaders();
  try {
    const result = await Instance(
      'PATCH',
      BASE_URL + `/astrologer/astrologer-particular/${id}/`,
      authHeaders,
      body,
    );
    return result;
  } catch (error) {
    return error;
  }
};

//post sfm token
export const getAllToken = async () => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/account/fcm-token/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//post sfm token
export const updateFcmToken = async data => {
  console.log('daata', data);
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'POST',
      BASE_URL + `/account/fcm-token/`,
      authHeaders,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};

//getKundali details
export const getUserKundaliDetails = async id => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/kundali/user-kundali/?id=${749}`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//getWallet
export const getWallet = async () => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/user/astro-wallet/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

///get astro-earings
export const getEarings = async astrologerId => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/chat/astro-earings/?astrologer=${astrologerId}`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

///get getSupport chatroom
export const getSupportchatroom = async () => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/chat/get-chatroom-support/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get deduct Balance On Call End   -------------
export const deductBalanceOnCallEnd = async data => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'POST',
      BASE_URL + `/chat/deduct-call-charge/`,
      authHeaders,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get deduct Balance On Call End   -------------
export const startLiveEvent = async () => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'POST',
      BASE_URL + `/chat/live-session/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get deduct Balance On Call End   -------------
export const endLiveSession = async id => {
  console.log('id=========', id);
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'PUT',
      BASE_URL + `/chat/live-session/${id}/session-end/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get deduct Balance On Call End   -------------
export const endLiveEvent = async id => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'PATCH',
      BASE_URL + `/chat/live-session/?id=${id}`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//get price of titile  -------------
export const getTitlePrice = async () => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/astrologer/top-astrologer-price/`,
      authHeaders,
      {},
    );
    return result;
  } catch (error) {
    return error;
  }
};

//Buy Top astrologerTitle  -------------
export const BuyTopastrologerTitle = async data => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'POST',
      BASE_URL + `/astrologer/top-astrologer/`,
      authHeaders,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};
//get performance  -------------
export const getPerformance = async id => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `/astrologer/astro-perfomance/?astrologer=${id}`,
      authHeaders,
      null,
    );
    return result;
  } catch (error) {
    return error;
  }
};
