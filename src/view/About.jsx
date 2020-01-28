import React from 'react';
import { Link } from 'react-router-dom';


const About = () => (
    <div  className="m-b-15 aboutPage">
        <div className="row">
            <div className="col-12"><h4 className="p-2">About</h4></div>
            <div className="col-6 aboutPage-content">
                <p className="fs14">
                    <b>MainStay</b> - cryptographic proofs of a single, verifiable history of data changes, without needing to trust any authority.
                </p>
                <p className="fs14">
                    Cryptographic proofs can be used to secure a wide variety of data sources such as permissioned blockchains, auditable databases, software repositories and document tracking systems ensuring that the history of state changes cannot be tampered with or altered in any way.
                    This <b>‘Proof-of-Immutable-State’</b>  (PoIS) is obtained via the trustless immutability inherent to the Bitcoin blockchain. Bitcoin’s global proof-of-work consensus process creates an objective and incorruptible ordering of transactions that does not rely on trust in third parties.
                </p>
                <p className="fs14">
                    MainStay utilizes this immutability via a so-called <b>‘staychain’,</b> a chain of successive commitments to a fan-in-only sequence of linked transactions on the Bitcoin blockchain where each transaction has only a single output. Enforcing this single-output rule for all transactions ensures that the staychain can only have a single, non-branching history from the base of the chain to the tip. Following this rule, the staychain state is therefore as immutable as the Bitcoin blockchain and is backed by its immense proof-of-work. Verifiable state commitments to the staychain are then also immutable, and the immutability of any sequence of committed states can be proven by verifying the validity of the staychain.
                </p>
                <p className="fs14">
                    The MainStay service operated by CommerceBlock provides a mechanism for service users to access a specific position (slot) in a  Merkle tree of commitments which is then regularly committed to a unique Bitcoin staychain. This enables the provision of <b>‘Immutability as a Service’</b>  where a large number of systems/processes can utilise a single Bitcoin staychain, with the cost of Bitcoin transaction fees shared among all users.
                </p>
                <p className="fs14">
                    The Mainstay service provides a public <b>REST API</b>  which enables users to seamlessly integrate third party systems in order to both perform state attestations and retrieve cryptographic proofs for independent verification of trustless immutability.
                </p>
                <p className="fs14">
                    <span>Mainstay service features at a glance:</span>
                    <ul>
                        <li>Obtain the full immutability of the Bitcoin blockchain for any system or process</li>
                        <li>Trustless audit trails and tamper-proof tracked changes</li>
                        <li>Straightforward integration with existing systems</li>
                        <li>Simple, intuitive API and clear documentation</li>
                        <li>Independent verification of proofs using open source tools</li>
                    </ul>

                </p>
                <p className="fs14">
                    For further details, please see our MainStay documentation inventory:
                    <span className="docDownload">
                        <a href="https://commerceblock.readthedocs.io/en/latest/">
                             <img src="doc-icon.png" alt="doc-icon"/>
                        MainStay - Tech Docs
                        </a>

                    </span>
                </p>
            </div>
            <div className="col-6 aboutImg">
                <img className="" src="about.svg" alt="about" width="80%"/>
            </div>
        </div>
    </div>
);

export default About;

