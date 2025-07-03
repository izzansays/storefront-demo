import ReactMarkdown from 'react-markdown'
// @ts-ignore
import readme from '../../README.md?raw'

const About = () => (
  <div className="prose mx-auto">
    <ReactMarkdown>{readme}</ReactMarkdown>
  </div>
)

export default About 