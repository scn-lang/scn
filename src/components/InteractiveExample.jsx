import { useState } from 'react';

const InteractiveExample = () => {
  const [activeExample, setActiveExample] = useState('react');

  const examples = {
    react: {
      title: 'React Component',
      description: 'A typical React component with hooks and props',
      before: `// UserProfile.jsx (2,156 tokens)
import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = ({ userId, onUpdate }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  const fetchUser = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(\`/api/users/\${id}\`);
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedData) => {
    try {
      const response = await fetch(\`/api/users/\${userId}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      const savedUser = await response.json();
      setUser(savedUser);
      setEditing(false);
      onUpdate?.(savedUser);
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={user.avatar} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      {editing ? (
        <EditForm user={user} onSave={handleSave} />
      ) : (
        <ProfileView user={user} onEdit={() => setEditing(true)} />
      )}
    </div>
  );
};

export default UserProfile;`,
      after: `// SCN Representation (52 tokens - 98% reduction!)
UserProfile.jsx◮
  ⤵React{useState,useEffect}
  ⤵./UserProfile.css
  ⚡UserProfile({userId,onUpdate})→JSX
    ◦user,loading,editing
    ⚡fetchUser(id)→Promise
    ⚡handleSave(updatedData)→Promise
  ⤴UserProfile`
    },
    python: {
      title: 'Python Class',
      description: 'A data processing class with multiple methods',
      before: `# data_processor.py (1,834 tokens)
import pandas as pd
import numpy as np
from typing import List, Dict, Optional
from datetime import datetime

class DataProcessor:
    """A comprehensive data processing utility class."""
    
    def __init__(self, config: Dict[str, any] = None):
        self.config = config or {}
        self.data = None
        self.processed_data = None
        self.metadata = {
            'created_at': datetime.now(),
            'version': '1.0.0',
            'processed': False
        }
    
    def load_data(self, source: str, format: str = 'csv') -> bool:
        """Load data from various sources."""
        try:
            if format == 'csv':
                self.data = pd.read_csv(source)
            elif format == 'json':
                self.data = pd.read_json(source)
            elif format == 'excel':
                self.data = pd.read_excel(source)
            else:
                raise ValueError(f"Unsupported format: {format}")
            
            self.metadata['rows'] = len(self.data)
            self.metadata['columns'] = list(self.data.columns)
            return True
        except Exception as e:
            print(f"Error loading data: {e}")
            return False
    
    def clean_data(self, drop_na: bool = True, 
                   fill_method: str = 'mean') -> None:
        """Clean and preprocess the data."""
        if self.data is None:
            raise ValueError("No data loaded")
        
        if drop_na:
            self.data = self.data.dropna()
        else:
            numeric_cols = self.data.select_dtypes(include=[np.number]).columns
            if fill_method == 'mean':
                self.data[numeric_cols] = self.data[numeric_cols].fillna(
                    self.data[numeric_cols].mean()
                )
    
    def transform_data(self, operations: List[str]) -> None:
        """Apply transformations to the data."""
        for operation in operations:
            if operation == 'normalize':
                numeric_cols = self.data.select_dtypes(include=[np.number]).columns
                self.data[numeric_cols] = (self.data[numeric_cols] - 
                                         self.data[numeric_cols].mean()) / self.data[numeric_cols].std()
            elif operation == 'log_transform':
                numeric_cols = self.data.select_dtypes(include=[np.number]).columns
                self.data[numeric_cols] = np.log1p(self.data[numeric_cols])
    
    def get_summary(self) -> Dict[str, any]:
        """Get a summary of the processed data."""
        if self.data is None:
            return {}
        
        return {
            'shape': self.data.shape,
            'dtypes': self.data.dtypes.to_dict(),
            'missing_values': self.data.isnull().sum().to_dict(),
            'numeric_summary': self.data.describe().to_dict()
        }`,
      after: `// SCN Representation (47 tokens - 97% reduction!)
data_processor.py◮
  ⤵pandas,numpy,typing,datetime
  ◉DataProcessor{config,data,processed_data,metadata}
    ⚡load_data(source,format='csv')→bool
    ⚡clean_data(drop_na=True,fill_method='mean')
    ⚡transform_data(operations:List[str])
    ⚡get_summary()→Dict[str,any]`
    },
    api: {
      title: 'REST API',
      description: 'Express.js API with multiple endpoints',
      before: `// api/users.js (2,341 tokens)
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get all users
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const users = await User.find()
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await User.countDocuments();
    
    res.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new user
router.post('/', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().isLength({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = new User({
      email,
      password: hashedPassword,
      name
    });

    await user.save();
    
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;`,
      after: `// SCN Representation (41 tokens - 98% reduction!)
api/users.js◮
  ⤵express,bcrypt,jwt,User,auth,validate
  ◦router
  ⚡GET/→{users,pagination}
  ⚡GET/:id→User
  ⚡POST/→{token,user}
  ⤴router`
    }
  };

  return (
    <div className="space-y-8">
      {/* Example Selector */}
      <div className="flex flex-wrap justify-center gap-4">
        {Object.entries(examples).map(([key, example]) => (
          <button
            key={key}
            onClick={() => setActiveExample(key)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeExample === key
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600'
            }`}
          >
            {example.title}
          </button>
        ))}
      </div>

      {/* Example Content */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h3 className="text-2xl font-bold text-white mb-2">
            {examples[activeExample].title}
          </h3>
          <p className="text-slate-400">
            {examples[activeExample].description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Before */}
          <div className="border-r border-slate-700/50">
            <div className="p-4 bg-red-500/10 border-b border-slate-700/50">
              <h4 className="font-semibold text-red-400">Before: Raw Code</h4>
            </div>
            <pre className="p-6 text-sm font-mono text-slate-300 overflow-x-auto h-96 overflow-y-auto">
              <code>{examples[activeExample].before}</code>
            </pre>
          </div>

          {/* After */}
          <div>
            <div className="p-4 bg-green-500/10 border-b border-slate-700/50">
              <h4 className="font-semibold text-green-400">After: SCN</h4>
            </div>
            <pre className="p-6 text-sm font-mono text-slate-300 overflow-x-auto h-96 overflow-y-auto">
              <code>{examples[activeExample].after}</code>
            </pre>
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 bg-slate-900/50 border-t border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">
              Token reduction: <span className="text-green-400 font-bold">97%+</span>
            </div>
            <div className="text-sm text-slate-400">
              Structural context: <span className="text-blue-400 font-bold">Preserved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveExample;