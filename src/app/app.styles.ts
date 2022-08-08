import styled from 'styled-components';
import BackgroundPatternRot from '../assets/patterns/background_pattern_rot.png';

const gradientColor2 = '#f1f7ff';

const gradient = `radial-gradient(circle, rgba(0, 0, 0, 0) 0%, ${gradientColor2} 100%);`;

export const SiteContainer = styled.div`
	display: grid;
	place-items: center;
	width: 100vw;
	height: 100vh;
	max-height: 100vh;
	overflow: auto;
	background: ${gradientColor2};
	background: ${gradient};
	background: -webkit-${gradient};
	background: -moz-${gradient};

	position: relative;
`;

export const SiteBackground = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;

	background: url(${BackgroundPatternRot});
	background-size: 100px;

	opacity: 0.2;
	z-index: -1;
`;
