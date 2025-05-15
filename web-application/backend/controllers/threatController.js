const ThreatDetection = require('../models/ThreatDetection');
const Operation = require('../models/Operation');

exports.storeDetection = async (itemName, frame, location = null) => {
  const detection = new ThreatDetection({
    item: itemName,
    frame: frame.toString('base64'),
    location,
    verified: false
  });

  await detection.save();
  return detection;
};

exports.verifyThreat = async (threatId, userId, isReal) => {
  const detection = await ThreatDetection.findById(threatId);
  if (!detection) throw new Error('Detection not found');

  if (isReal) {
    // Create or find today's operation
    const today = new Date().toISOString().split('T')[0];
    let operation = await Operation.findOne({ date: today });
    
    if (!operation) {
      operation = new Operation({
        date: today,
        start_time: new Date(),
        verified_by: userId,
        threat_count: 0
      });
    }

    // Update detection
    detection.verified = true;
    detection.verified_by = userId;
    detection.verified_at = new Date();
    detection.operation_id = operation._id;

    // Update operation
    operation.threat_count += 1;
    operation.threats.push(detection._id);

    await Promise.all([detection.save(), operation.save()]);
  } else {
    await ThreatDetection.findByIdAndDelete(threatId);
  }

  return detection;
};

exports.getAllDetections = async () => {
  const verified = await ThreatDetection.find({ verified: true });
  const unverified = await ThreatDetection.find({ verified: false });
  return { verified, unverified };
};

exports.getOperations = async () => {
  return await Operation.find().sort({ date: -1 });
};

exports.getOperationThreats = async (operationId) => {
  return await ThreatDetection.find({ operation_id: operationId });
};