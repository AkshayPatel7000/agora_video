import Button from "@material-ui/core/Button"
// import Box from '@mui/material/Box';
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "glamor";
// import CallIcon from '@mui/icons-material/Call';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import { Button } from 'react-bootstrap';
// import { Input} from "@nextui-org/react";
import io from "socket.io-client"
import "../css/App.css"
// import { fontFamily } from "@mui/system";
import VideoCall from './videoCall'
import { Link } from "@material-ui/core"



export default function Dashboard() {
	const [me, setMe] = useState("")
	const [stream, setStream] = useState()
	const [receivingCall, setReceivingCall] = useState(false)
	const [caller, setCaller] = useState()
	// const [call, setCall] = useState()
	const [callerSignal, setCallerSignal] = useState()
	const [callAccepted, setCallAccepted] = useState(false)
	const [idToCall, setIdToCall] = useState("")
	const [callEnded, setCallEnded] = useState(false)
	const [name, setName] = useState("")
	const [sendname, setName2] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef = useRef()
	const [inCall, setInCall] = useState(false);

	console.log("naaaam", sendname)

	// useEffect(() => {
	// 	navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
	// 		setStream(stream)
	// 		myVideo.current.srcObject = stream
	// 	})

	// 	socket.on("me", (id) => {
	// 		setMe(id)
	// 	})
	// 	socket.on("callUser2", (data) => {
	// 		setReceivingCall(true)
	// 		setCaller(data.from)
	// 		// setCall(data.from)
	// 		setName(data.name)

	// 		setCallerSignal(data.signal)
	// 		toast.warning(customMsg({ data:data, name2: data.name }), {
	// 			position: "bottom-right",
	// 			autoClose: 50000,
	// 			hideProgressBar: false,
	// 			closeOnClick: true,
	// 			pauseOnHover: true,
	// 			draggable: true,
	// 			progress: undefined,
	// 			bodyClassName: css({
	// 				backgroundColor: 'blue',
	// 				height: '100%',
	// 				width: '100%',
	// 			})
	// 		})

	// 		console.log('data1', data)
	// 		console.log("caller", caller)
	// 		console.log("name", name)
	// 	})

	// 	socket.on("callRejected", (data) => {
	// 		setCallEnded(true)
	// 		setCaller(data.from)
	// 		// setCall(data.from)
	// 		setName(data.name)
	// 		setCallerSignal(data.signal)
	// 		console.log("data rej:", data)

	// 		toast.error(rejectMsg({ name3: data.name }), {
	// 			position: "top-right",
	// 			autoClose: 5000,
	// 			hideProgressBar: false,
	// 			closeOnClick: true,
	// 			pauseOnHover: true,
	// 			draggable: true,
	// 			progress: undefined,
	// 			bodyClassName: css({
	// 				backgroundColor: 'blue',
	// 				height: '100%',
	// 				width: '100%',
	// 			})
	// 		})
	// 	})
	// }, [])
	// console.log("callerME", caller)

	// const callUser = (id) => {
	// 	const peer = new Peer({
	// 		initiator: true,
	// 		trickle: false,
	// 		stream: stream
	// 	})
	// 	peer.on("signal", (data) => {
	// 		socket.emit("callUser", {
	// 			userToCall: id,
	// 			signalData: data,
	// 			from: me,
	// 			name: name
	// 		})
	// 		setCaller(me)
	// 	})
	// 	peer.on("stream", (stream) => {
	// 		userVideo.current.srcObject = stream
	// 	})
	// 	socket.on("callAccepted", (signal) => {
	// 		setCallAccepted(true)
	// 		peer.signal(signal)
	// 	})
	// 	connectionRef.current = peer
	// }

	// const answerCall = () => {	


	// 	setCallAccepted(true)
	// 	const peer = new Peer({
	// 		initiator: false,
	// 		trickle: false,
	// 		stream: stream
	// 	})
	// 	peer.on("signal", (data) => {
	// 		socket.emit("answerCall", { signal: data, to: caller })
	// 	})
	// 	peer.on("stream", (stream) => {
	// 		userVideo.current.srcObject = stream
	// 	})
	// 	peer.signal(callerSignal)
	// 	connectionRef.current = peer

	// }

	// const leaveCall = () => {
	// 	setCallEnded(true)
	// 	connectionRef.current.destroy()
	// }

	// const rejectCall = (data) => {

	// 	// setCallEnded(true)
	// 	setReceivingCall(false)

	// 	console.log("data3", data)
	// 	console.log("Caler2", me)
	// 	socket.emit('callReject', {

	// 		to: data.from,
	// 		// to: call,
	// 		// from: data.from,
	// 		name: data.name,
	// 	})
	// 	// socket.emit('callReject2', {

	// 	// 	from: id,
	// 	// 	name: name
	// 	// })
	// 	// toast.error("Call Rejected", {
	// 	// 	position: "top-right",
	// 	// 	autoClose: 5000,
	// 	// 	hideProgressBar: false,
	// 	// 	closeOnClick: true,
	// 	// 	pauseOnHover: true,
	// 	// 	draggable: true,
	// 	// 	progress: undefined
	// 	// })
	// }
	// const customMsg = ({data, name2 }) => (
	// 	<div>
	// 		<p style={{ fontSize: "20px" }}>{name2 ? name2 : name} is calling...</p>
	// 		<Button variant="contained" color="success" id="b" onClick={() => answerCall()}>Accept</Button>
	// 		<Button variant="contained" color="secondary" style={{ marginLeft: "5px" }} onClick={() => rejectCall(data)}>Reject</Button>
	// 	</div>

	// 	// <div className="caller"  >
	// 	// 	<h1 style={{ fontSize: "20px" }}>{name2 ? name2 : name} is calling...</h1>
	// 	// 	<Button variant="contained" color="success" id="b" onClick={() => answerCall()}>
	// 	// 		Accept Call
	// 	// 	</Button>
	// 	// 	<Button style={{ marginLeft: "20px" }} variant="contained" color="secondary" onClick={() => closeToast()}>
	// 	// 		Reject Call
	// 	// 	</Button>
	// 	// </div>
	// )
	// const rejectMsg = ({ name3 }) => (
	// 	<div>
	// 		<p style={{ fontSize: "20px" }}> {name3 ? name3 : name} reject your call.</p>
	// 	</div>
	// )

	// console.log("Signal",callerSignal)

	return (
		<div className="all" >
			<p style={{ textAlign: "center", color: '#fff' }} className="w3-jumbo w3-animate-top">Morex</p>
			<div className="container">
				<div className="video-container w3-animate-left w3-animate-opacity" >
					{/* <div className="video">
						{ stream  ? <video playsInline muted ref={myVideo} autoPlay style={{ width: "100%" }} /> :
							<h1 className="loader"></h1>
						}
					</div>
					<div className="video">
						{callAccepted && !callEnded ?
							<video playsInline ref={userVideo} autoPlay style={{ width: "100%" }} /> :
							<h1 className="loader"></h1>}
					</div> */}
					{/* <div>
						{receivingCall && !callAccepted ? (
							<h1>You are calling to {name} </h1>
						) : <h1>Loading...</h1>}
					</div> */}
					{inCall ? (
						<VideoCall setInCall={setInCall} />
					) : (<h1 className="loader"></h1>)}
				</div>
				<div className="myId w3-xlarge w3-wide w3-animate-opacity">
					{/* <Box sx={{ '& > :not(style)': { m: 1 } }}>
						<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
							<AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
							<TextField id="input-with-sx" label="With sx" variant="standard" />
						</Box>
					</Box> */}
					<TextField
						id="filled-basic"
						label="Name"
						variant="filled"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
							localStorage.setItem("name", e.target.value); setName2(e.target.value)
						}}
						style={{ marginBottom: "20px" }}
					/>
					<CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
						<Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
							Copy ID
						</Button>
					</CopyToClipboard>

					<TextField
						id="filled-basic"
						label="ID to call"
						variant="filled"
						value={idToCall}
						onChange={(e) => setIdToCall(e.target.value)}
					/>
					<div className="call-button">
						{callAccepted && !callEnded ? (
							<Button variant="contained" color="secondary" >
								End Call
							</Button>
						) : (
							<IconButton color="default" aria-label="call" onClick={() => setInCall(true)} >
								<PhoneIcon fontSize="large" />
							</IconButton>
						)}
						{/* {idToCall} */}
					</div>
					<ToastContainer />
				</div>
				<div>
					{receivingCall && !callAccepted ? (
						<div className="caller"  >
							<h1 >{name} is calling...</h1>
							<Button variant="contained" color="success" id="b" >
								Accept Call
							</Button>
							<Button style={{ marginLeft: "20px" }} variant="contained" color="secondary" >
								Reject Call
							</Button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	)
}
