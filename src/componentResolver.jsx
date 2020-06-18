import FormComponents from './components/FormComponents'

const getComponent = (component) => {
  return FormComponents[component.id](component)
}

export default getComponent
