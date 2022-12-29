import SecuredFields from './SecuredFields';
import uuid from '../utils/uuid';
/**
 * Maps each component with a Component element.
 */
const componentsMap = {
    securedfields: SecuredFields,
    redirect: null,
    default: null
};

/**
 * Instantiates a new Component element either by class reference or by name
 * It also assigns a new uuid to each instance, so we can recognize it during the current session
 * @param componentType - class or componentsMap's key
 * @param props - for the new Component element
 * @returns new PaymentMethod or null
 */
export const getComponent = (componentType, props) => {
    const Component = componentsMap[componentType] || componentsMap.default;
    return Component ? new Component({ ...props, id: `${componentType}-${uuid()}` }) : null;
};

/**
 * Gets the configuration for type from componentsConfig
 * @param type - component type
 * @param componentsConfig - global paymentMethodsConfiguration
 * @returns component configuration
 */
export const getComponentConfiguration = (type: string, componentsConfig = {}, isStoredCard = false) => {
    let pmType = type;
    if (type === 'scheme') {
        pmType = isStoredCard ? 'storedCard' : 'card';
    }

    return componentsConfig[pmType] || {};
};

export default componentsMap;
