import earthJpg from '@/assets/earth.jpg';
import Smth from '@/assets/smth.svg'

export default function About() {
    return (
        <div>
            About
            <img width={100} height={100} src={earthJpg} />
            <br />
            <Smth />
            {earthJpg}
        </div>
    )
}